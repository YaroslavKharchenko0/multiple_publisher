variable "keycloak_url" {
  type = string
}

variable "keycloak_admin_username" {
  type = string
}

variable "keycloak_admin_password" {
  type = string
}

variable "keycloak_service_name" {
  type = string
}

variable "env" {
  type = string
}

variable "valid_redirect_uris" {
  type = list(string)
}
