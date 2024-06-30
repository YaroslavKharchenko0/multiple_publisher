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

  login_with_email_allowed = true

  default_signature_algorithm = "RS256"
}

resource "keycloak_realm_events" "realm_events" {
  realm_id = keycloak_realm.realm.id

  events_enabled    = true
  events_expiration = 3600

  admin_events_enabled         = true
  admin_events_details_enabled = true

  enabled_event_types = [
    "LOGIN",
    "LOGIN_ERROR",
    "REGISTER",
    "REGISTER_ERROR",
    "LOGOUT",
    "LOGOUT_ERROR"
  ]

  events_listeners = [
    "jboss-logging",
  ]
}

resource "keycloak_openid_client" "service" {
  realm_id    = keycloak_realm.realm.id
  client_id   = var.keycloak_service_name
  name        = var.keycloak_service_name
  description = "Service for ${var.keycloak_service_name}"
  enabled     = true
  access_type = "CONFIDENTIAL"
  standard_flow_enabled = true
  valid_redirect_uris = var.valid_redirect_uris
  web_origins = var.valid_redirect_uris
}

resource "keycloak_role" "user_role" {
  realm_id = keycloak_realm.realm.id
  name     = "user"
}

resource "keycloak_role" "admin_role" {
  realm_id = keycloak_realm.realm.id
  name     = "admin"
}

resource "keycloak_group" "users_group" {
  realm_id = keycloak_realm.realm.id
  name     = "users"
}

resource "keycloak_group" "admins_group" {
  realm_id = keycloak_realm.realm.id
  name     = "admins"
}

resource "keycloak_group_roles" "users_group_roles" {
  realm_id = keycloak_realm.realm.id
  group_id = keycloak_group.users_group.id
  role_ids = [keycloak_role.user_role.id]
}

resource "keycloak_group_roles" "admins_group_roles" {
  realm_id = keycloak_realm.realm.id
  group_id = keycloak_group.admins_group.id
  role_ids    = [keycloak_role.admin_role.id]
}

resource "local_file" "credentials" {
  filename = "modules/auth/${var.env}.credentials.json"
  content  = jsonencode({
    client_id     = keycloak_openid_client.service.client_id
    client_secret = keycloak_openid_client.service.client_secret
    realm         = keycloak_realm.realm.realm
  })
}
