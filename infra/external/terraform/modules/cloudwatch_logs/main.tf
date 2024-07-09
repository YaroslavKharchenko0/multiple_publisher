resource "aws_cloudwatch_log_group" "multi_publisher_task_family_dev" {
  name              = "/ecs/multi-publisher-task-family-dev"
  retention_in_days = var.retention_in_days

  tags = {
    Name = "multi-publisher-task-family-dev"
  }
}
