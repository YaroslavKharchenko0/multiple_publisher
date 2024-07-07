resource "aws_elastic_beanstalk_application" "app" {
  name        = var.application_name
  description = var.application_description

  tags = var.tags
}

resource "aws_elastic_beanstalk_environment" "app_env" {
  name                = var.environment_name
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = var.solution_stack_name

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "DOCKER_IMAGE"
    value     = var.docker_image
  }

  tags = var.tags
}
