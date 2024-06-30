output "user_role_id" {
  value = keycloak_role.user_role.id
}

output "admin_role_id" {
  value = keycloak_role.admin_role.id
}

output "service_client_id" {
  value = keycloak_openid_client.service.client_id
}
