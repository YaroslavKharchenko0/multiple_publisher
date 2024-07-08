resource "aws_db_subnet_group" "main" {
  name       = "db-subnet-group-${var.env}"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "db-subnet-group-${var.env}"
    Env  = var.env
  }
}

resource "aws_db_instance" "postgres" {
  allocated_storage    = var.allocated_storage
  engine               = "postgres"
  engine_version       = "16"
  instance_class       = var.instance_class
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres16"
  skip_final_snapshot  = true
  vpc_security_group_ids = var.vpc_security_group_ids
  publicly_accessible  = var.publicly_accessible
  db_subnet_group_name = aws_db_subnet_group.main.name

  tags = {
    Name = var.db_name
    Env  = var.env
  }

  iam_database_authentication_enabled = false
  maintenance_window                  = "Mon:00:00-Mon:03:00"
  backup_window                       = "03:00-06:00"
  deletion_protection                 = true
  db_name                             = var.db_name
}
