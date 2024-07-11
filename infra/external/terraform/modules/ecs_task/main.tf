  resource "aws_ecs_task_definition" "this" {
  family                   = var.family
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn

  container_definitions    = jsonencode([{
    name                  = "api"
    image                 = "${var.ecr_repository_url}:latest"
    memory                = 1024
    cpu                   = 512
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
    logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "/ecs/${var.family}"
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = "ecs"
        }
    }
    healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://127.0.0.1:4000 || exit 1"]
        interval    = 30
        timeout     = 3
    }
  }])
}
