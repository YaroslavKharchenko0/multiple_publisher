output "ecs_service_name" {
  description = "Название ECS Service"
  value       = aws_ecs_service.this.name
}
