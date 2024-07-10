variable "env" {
  description = "The environment for the ECS task definition"
  type        = string
}

variable "ecr_repository_url" {
  description = "The URL of the ECR repository"
  type        = string
}

variable "execution_role_arn" {
  description = "The ARN of the ECS task execution role"
  type        = string
}

variable "task_role_arn" {
  description = "The ARN of the ECS task role"
  type        = string
}

variable "region" {
  description = "The AWS region"
  type        = string
}

variable "app_environments" {
  description = "The environment variables for the ECS task definition"
  type        = map(string)
  default     = {}
}
