provider "aws" {
  region = var.region
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

module "security_group" {
  source   = "./modules/security_group"
  vpc_id   = var.vpc_id
  allow_ips = var.allow_ips
  env      = var.env
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
}

module "api_repo" {
  source = "./modules/ecr"
  repository_name = "api_repo"
  tags = {
    Env = var.env
  }
}

module "vpc" {
  source = "./modules/vpc"
  cidr_block = "10.0.0.0/16"
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  name = "multi-publisher-vpc-${var.env}"
}

module "ecs" {
  source = "./modules/ecs"
  cluster_name = "multi-publisher-cluster-${var.env}"
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
      credentials = {
        aws_access_key_id     = module.iam.iam_user_access_key_id
        aws_secret_access_key = module.iam.iam_user_secret_access_key
        region                = var.region
        user_pool_id          = module.cognito.user_pool_id
        user_pool_client_id   = module.cognito.user_pool_client_id
      }
    },
    db = {
      credentials = {
        db_instance_endpoint  = module.rds.db_instance_endpoint
        db_username           = var.db_username
        db_password           = var.db_password
        db_connection_string  = "postgres://${var.db_username}:${var.db_password}@${module.rds.db_instance_endpoint}/${var.db_name}"
      }
    },
    ecr = {
      credentials = {
        repository_url = module.api_repo.repository_url
      }
    },
    vpc = {
      credentials = {
        vpc_id = module.vpc.vpc_id
      }
    },
    ecs = {
      credentials = {
        cluster_id = module.ecs.cluster_id
        cluster_name = module.ecs.cluster_name
      }
    }
  })
}

output "credentials_file" {
  description = "The path to the generated credentials file"
  value       = local_file.credentials.filename
}
