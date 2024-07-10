resource "aws_ecs_task_definition" "this" {
  family                   = "${var.env}-task"
  container_definitions    = jsonencode([{
    name                  = "api"
    image                 = "${var.ecr_repository_url}:latest"
    memory                = 512
    cpu                   = 256
    essential             = true
    portMappings          = [{
      containerPort        = 4000
      hostPort             = 4000
    }]
    environment           = [
      for key, value in var.app_environments : {
      name  = key
      value = value
     }
    ]
    logConfiguration      = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/${var.env}-task"
        "awslogs-region"        = var.region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn
}
