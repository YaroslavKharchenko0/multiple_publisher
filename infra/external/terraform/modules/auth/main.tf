terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "4.4.0"
    }
  }
}

provider "keycloak" {
  url          = var.keycloak_url
  client_id    = "admin-cli"
  username     = var.keycloak_admin_username
  password     = var.keycloak_admin_password
  realm        = "master"
}

resource "keycloak_realm" "realm" {
  realm   = var.env
  enabled = true
}

resource "keycloak_openid_client" "service" {
  realm_id    = keycloak_realm.realm.id
  client_id   = var.keycloak_service_name
  name        = var.keycloak_service_name
  description = "Service for ${var.keycloak_service_name}"
  enabled     = true
  access_type = "CONFIDENTIAL"
}

resource "keycloak_role" "user_role" {
  realm_id = keycloak_realm.realm.id
  name     = "user"
}

resource "keycloak_role" "admin_role" {
  realm_id = keycloak_realm.realm.id
  name     = "admin"
}

resource "local_file" "credentials" {
  filename = "modules/auth/${var.env}.credentials.json"
  content  = jsonencode({
    client_id     = keycloak_openid_client.service.client_id
    client_secret = keycloak_openid_client.service.client_secret
    realm         = keycloak_realm.realm.realm
  })
}
