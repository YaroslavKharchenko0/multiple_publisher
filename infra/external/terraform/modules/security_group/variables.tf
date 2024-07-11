variable "vpc_id" {
  description = "The VPC ID where the security group will be created"
  type        = string
}

variable "allow_ips" {
  description = "List of IPs allowed to access the database"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "env" {
  description = "The environment to deploy resources"
  type        = string
  default     = "dev"
}

variable "app_name" {
  description = "The name of the application"
  type        = string
}
