variable "name" {
  description = "The name of the repository"
  type        = string
}

variable "env" {
  description = "The environment to deploy resources"
  type        = string
  default     = "dev"
}
