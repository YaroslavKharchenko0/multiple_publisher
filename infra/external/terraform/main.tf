provider "aws" {
  region = var.region
}

module "iam" {
  source         = "./modules/iam"
  region         = var.region
  user_pool_name = var.user_pool_name
}

module "cognito" {
  source                 = "./modules/cognito"
  region                 = var.region
  user_pool_name         = var.user_pool_name
  user_pool_client_name  = var.user_pool_client_name
  iam_role_arn           = module.iam.cognito_role_arn
}

module "rds" {
  source              = "./modules/rds"
  allocated_storage   = var.db_allocated_storage
  instance_class      = var.db_instance_class
  db_name             = var.db_name
  db_username         = var.db_username
  db_password         = var.db_password
  env                 = var.env
}

resource "local_file" "credentials" {
  filename = "${path.module}/${var.env}.credentials.json"
  content  = jsonencode({
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
    }
  })
}

output "credentials_file" {
  description = "The path to the generated credentials file"
  value       = local_file.credentials.filename
}
