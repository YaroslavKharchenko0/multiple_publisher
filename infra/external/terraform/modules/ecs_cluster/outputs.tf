output "ecs_cluster_id" {
  description = "The ECS Cluster ID"
  value       = aws_ecs_cluster.this.id
}

output "ecs_cluster_name" {
  description = "The ECS Cluster name"
  value       = aws_ecs_cluster.this.name
}

output "ecs_cluster_log_group_name" {
  description = "The ECS Cluster log group name"
  value       = aws_cloudwatch_log_group.ecs_cluster_logs.name
}

