variable "name" {
  description = "The name of the ALB"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "public_subnets" {
  description = "List of public subnets"
  type        = list(string)
}

variable "security_groups" {
  description = "List of security groups"
  type        = list(string)
}

variable "env" {
  description = "The environment to deploy resources"
  type        = string
}
