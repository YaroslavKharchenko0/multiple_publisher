variable "env" {
  description = "The environment to deploy resources"
  type        = string
}

variable "cluster_id" {
  description = "ID ECS claster"
  type        = string
}

variable "task_definition_arn" {
  description = "ARN ECS task definition"
  type        = string
}

variable "subnets" {
  description = "Subnets for ECS Service"
  type        = list(string)
}

variable "security_group_id" {
  description = "ID security group for ECS Service"
  type        = string
}

variable "target_group_arn" {
  description = "ARN target group for ECS Service"
  type        = string
}
