terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "4.4.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "2.1.0"
    }
  }
}


module "auth" {
  source = "./modules/auth"

  keycloak_url           = var.keycloak_url
  keycloak_admin_username = var.keycloak_admin_username
  keycloak_admin_password = var.keycloak_admin_password
  keycloak_service_name  = var.keycloak_service_name
  env                    = var.env
}
