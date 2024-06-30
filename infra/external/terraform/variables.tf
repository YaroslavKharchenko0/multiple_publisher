variable "keycloak_url" {
  description = "URL of the Keycloak server"
  type        = string
}

variable "keycloak_admin_username" {
  description = "Admin username for Keycloak"
  type        = string
}

variable "keycloak_admin_password" {
  description = "Admin password for Keycloak"
  type        = string
}

variable "keycloak_service_name" {
  description = "Name of the service to register in Keycloak"
  type        = string
}

variable "env" {
  description = "Environment name"
  type        = string
}

variable "valid_redirect_uris" {
  description = "Valid redirect URIs for the service"
  type        = list(string)
}
