variable "application_name" {
  description = "The name of the Elastic Beanstalk application"
  type        = string
}

variable "application_description" {
  description = "The description of the Elastic Beanstalk application"
  type        = string
  default     = ""
}

variable "environment_name" {
  description = "The name of the Elastic Beanstalk environment"
  type        = string
}

variable "solution_stack_name" {
  description = "The solution stack to use for the Elastic Beanstalk environment"
  type        = string
  default     = "64bit Amazon Linux 2 v3.8.3 running Docker"
}

variable "docker_image" {
  description = "The Docker image URL to deploy"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the resources"
  type        = map(string)
  default     = {}
}
