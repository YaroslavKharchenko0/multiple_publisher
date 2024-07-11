variable "region" {
  description = "The AWS region to deploy resources"
  type        = string
}


variable "iam_user_name" {
  description = "The name of the IAM User"
  type        = string
  default     = "terraform-user"
}

variable "env" {
  description = "The environment to deploy resources"
  type        = string
  default     = "dev"
}
