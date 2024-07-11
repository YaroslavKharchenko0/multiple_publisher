variable "repository_name" {
  description = "The name of the ECR repository"
  type        = string
}

variable "tags" {
  description = "Tags to apply to the repository"
  type        = map(string)
  default     = {}
}
