resource "aws_ecr_repository" "app_ecr_repo" {
  name = var.name

  tags = {
    Env = var.env
  }
}
