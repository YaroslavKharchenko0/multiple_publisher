variable "region" {
  description = "The AWS region to deploy resources"
  type        = string
}

variable "user_pool_name" {
  description = "The name of the Cognito User Pool"
  type        = string
}

variable "user_pool_client_name" {
  description = "The name of the Cognito User Pool Client"
  type        = string
}

variable "iam_role_arn" {
  description = "The ARN of the IAM role for Cognito"
  type        = string
}
