output "service_name" {
  description = "The name of the ECS service"
  value       = aws_ecs_service.app.name
}
