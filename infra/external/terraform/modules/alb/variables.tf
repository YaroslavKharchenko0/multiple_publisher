variable "env" {
  description = "Окружение для ALB"
  type        = string
}

variable "public_subnets" {
  description = "Публичные подсети для ALB"
  type        = list(string)
}

variable "security_group_id" {
  description = "ID группы безопасности для ALB"
  type        = string
}

variable "vpc_id" {
  description = "ID VPC"
  type        = string
}
