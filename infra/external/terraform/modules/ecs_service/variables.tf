variable "family" {
  description = "The name of the ECS task family"
  type        = string
}

variable "cluster_id" {
  description = "The ID of the ECS cluster"
  type        = string
}

variable "task_definition_arn" {
  description = "The ARN of the ECS task definition"
  type        = string
}

variable "desired_count" {
  description = "The desired number of tasks"
  type        = number
}

variable "subnets" {
  description = "The subnets associated with the ECS service"
  type        = list(string)
}

variable "security_groups" {
  description = "The security groups associated with the ECS service"
  type        = list(string)
}
