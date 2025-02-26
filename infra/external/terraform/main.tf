provider "aws" {
  region = var.region
}

module "cloudwatch_logs" {
  source            = "./modules/cloudwatch_logs"
  retention_in_days = var.log_retention_in_days
}

module "iam" {
  source         = "./modules/iam"
  region         = var.region
  env            = var.env
}

module "cognito" {
  source                 = "./modules/cognito"
  region                 = var.region
  user_pool_name         = var.user_pool_name
  user_pool_client_name  = var.user_pool_client_name
  iam_role_arn           = module.iam.cognito_role_arn
}

module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]
  availability_zones = var.vpc_availability_zones
  name = "${var.app_name}-vpc-${var.env}"
  env = var.env
}

module "security_group" {
  source   = "./modules/security_group"
  vpc_id   = module.vpc.vpc_id
  allow_ips = var.allow_ips
  env      = var.env
  app_name = var.app_name
}


module "rds" {
  source                = "./modules/rds"
  allocated_storage     = var.db_allocated_storage
  instance_class        = var.db_instance_class
  db_name               = var.db_name
  db_username           = var.db_username
  db_password           = var.db_password
  env                   = var.env
  publicly_accessible   = var.db_publicly_accessible
  vpc_security_group_ids = [module.security_group.security_group_id]
  subnet_ids = module.vpc.public_subnets
}

module "api_repo" {
  source = "./modules/ecr"
  repository_name = "${var.app_name}-api-repo-${var.env}"
  tags = {
    Env = var.env
  }
}

module "api_ecs_cluster" {
  source = "./modules/ecs_cluster"
  env = var.env
  log_retention_in_days = 7
}

module "api_ecs_task" {
  source = "./modules/ecs_task"
  env = var.env
  region = var.region
  task_role_arn = module.iam.ecs_task_role_arn
  execution_role_arn = module.iam.ecs_task_execution_role_arn
  ecr_repository_url = module.api_repo.repository_url
  app_environments = var.app_environments
  family = "multi-publisher-task-family-dev"
}

module "api_alb" {
  source            = "./modules/alb"
  env               = var.env
  public_subnets    = module.vpc.public_subnets
  security_group_id = module.security_group.alb_sc_group_id
  vpc_id            = module.vpc.vpc_id
}

module "api_ecs_service" {
  source = "./modules/ecs_service"
  env =  var.env
  cluster_id = module.api_ecs_cluster.ecs_cluster_id
  subnets = module.vpc.public_subnets
  security_group_id = module.security_group.ecs_sc_group_id
  target_group_arn = module.api_alb.target_group_arn
  task_definition_arn = module.api_ecs_task.task_definition_arn
}


resource "local_file" "credentials" {
  filename = "${path.module}/${var.env}.credentials.json"
  content  = jsonencode({
    iam = {
      cognito = {
        role_arn = module.iam.cognito_role_arn
      },
      ecs = {
        task_execution_role_arn = module.iam.ecs_task_execution_role_arn
      }
    }
    auth = {
      aws_access_key_id     = module.iam.iam_user_access_key_id
      aws_secret_access_key = module.iam.iam_user_secret_access_key
      region                = var.region
      user_pool_id          = module.cognito.user_pool_id
      user_pool_client_id   = module.cognito.user_pool_client_id
    },
    db = {
      db_instance_endpoint  = module.rds.db_instance_endpoint
      db_username           = var.db_username
      db_password           = var.db_password
      db_connection_string  = "postgres://${var.db_username}:${var.db_password}@${module.rds.db_instance_endpoint}/${var.db_name}"
    },
    ecr = {
      repository_url = module.api_repo.repository_url
    },
    vpc = {
      vpc_id = module.vpc.vpc_id
    }
  })
}


output "credentials_file" {
  description = "The path to the generated credentials file"
  value       = local_file.credentials.filename
}
