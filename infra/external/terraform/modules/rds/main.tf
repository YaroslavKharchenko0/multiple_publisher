resource "aws_db_instance" "postgres" {
  allocated_storage    = var.allocated_storage
  engine               = "postgres"
  engine_version       = "16"
  instance_class       = var.instance_class

  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true

  tags = {
    Name = var.db_name,
    Env = var.env
  }
}
