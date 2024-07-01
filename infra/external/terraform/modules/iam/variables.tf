variable "region" {
  description = "The AWS region to deploy resources"
  type        = string
}

variable "user_pool_name" {
  description = "The name of the Cognito User Pool"
  type        = string
}

variable "iam_user_name" {
  description = "The name of the IAM User"
  type        = string
  default     = "terraform-user"
}
