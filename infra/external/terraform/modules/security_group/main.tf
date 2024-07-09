# Postgres RDS security group
resource "aws_security_group" "rds_security_group" {
  name_prefix = "rds-sg-${var.app_name}-${var.env}"
  description = "Security group for RDS instance"
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.allow_ips
    content {
      description = "PostgreSQL"
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg-${var.app_name}-${var.env}"
    Env = var.env
  }
}


# Load balancer security group
resource "aws_security_group" "alb_sg" {
  name        = "alb-sg-${var.app_name}-${var.env}"
  description = "Security group for ALB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "alb-sg-${var.app_name}-${var.env}"
    Env  = var.env
  }
}
