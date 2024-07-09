variable "app_name" {
  description = "The name of the application"
  type        = string
}

variable "region" {
  description = "The AWS region to deploy resources"
  type        = string
  default     = "us-west-2"
}

variable "user_pool_name" {
  description = "The name of the Cognito User Pool"
  type        = string
}

variable "user_pool_client_name" {
  description = "The name of the Cognito User Pool Client"
  type        = string
}

variable "env" {
  description = "The environment to deploy resources"
  type        = string
  default     = "dev"
}


variable "db_allocated_storage" {
  description = "The allocated storage in gigabytes"
  type        = number
  default     = 20
}

variable "db_instance_class" {
  description = "The instance type of the RDS instance"
  type        = string
  default     = "db.t3.micro"
}

variable "db_username" {
  description = "The username for the database"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "The password for the database"
  type        = string
  default     = "password"
  sensitive   = true
}

variable "db_name" {
  description = "The name of the database"
  type        = string
  default     = "mydb"
}

variable "db_publicly_accessible" {
  description = "Whether the RDS instance is publicly accessible"
  type        = bool
  default     = false
}

variable "allow_ips" {
  description = "List of IPs allowed to access the database"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "app_environments" {
  description = "Application environment variables"
  type = map(string)
  default = {
    PORT                        = 4000
    APP_NAME                    = "api"
    LOG_LEVEL                   = "debug"
    LOG_JSON                    = "false"
  }
}

variable "vpc_availability_zones" {
  description = "A list of availability zones"
  type        = list(string)
}
