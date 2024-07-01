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
    }
  })
}

output "credentials_file" {
  description = "The path to the generated credentials file"
  value       = local_file.credentials.filename
}
