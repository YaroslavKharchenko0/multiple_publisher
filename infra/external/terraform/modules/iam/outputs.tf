output "cognito_role_arn" {
  description = "The ARN of the Cognito IAM role"
  value       = aws_iam_role.cognito_role.arn
}

output "iam_user_access_key_id" {
  description = "The access key ID for the IAM user"
  value       = aws_iam_access_key.iam_user_access_key.id
}

output "iam_user_secret_access_key" {
  description = "The secret access key for the IAM user"
  value       = aws_iam_access_key.iam_user_access_key.secret
}
output "ecs_task_execution_role_arn" {
  description = "The ARN of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution_role.arn
}
