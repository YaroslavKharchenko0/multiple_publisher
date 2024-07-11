output "task_definition_arn" {
  description = "The ECS Task Definition ARN"
  value       = aws_ecs_task_definition.this.arn
}
