resource "aws_ecs_cluster" "this" {
  name = "${var.env}-ecs-cluster"
}

resource "aws_cloudwatch_log_group" "ecs_cluster_logs" {
  name              = "/ecs/${var.env}-ecs-cluster"
  retention_in_days = var.log_retention_in_days

  tags = {
    Name = "${var.env}-ecs-cluster"
  }
}
