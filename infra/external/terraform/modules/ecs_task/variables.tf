variable "family" {
  description = "The name of the ECS task family"
  type        = string
}

variable "cpu" {
  description = "The number of CPU units used by the task"
  type        = string
}

variable "memory" {
  description = "The amount of memory (in MiB) used by the task"
  type        = string
}

variable "execution_role_arn" {
  description = "The ARN of the IAM role that allows your Amazon ECS container tasks to make calls to other AWS services"
  type        = string
}

variable "ecr_repository_url" {
  description = "The URL of the ECR repository"
  type        = string
}

variable "app_enviropments" {
  description = "The environment variables to pass to the container"
  type        = map(string)
}
variable "region" {
  description = "The AWS region"
  type        = string
}
