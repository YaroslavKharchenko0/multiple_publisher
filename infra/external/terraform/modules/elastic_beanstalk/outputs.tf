output "application_name" {
  description = "The name of the Elastic Beanstalk application"
  value       = aws_elastic_beanstalk_application.app.name
}

output "environment_name" {
  description = "The name of the Elastic Beanstalk environment"
  value       = aws_elastic_beanstalk_environment.app_env.name
}

output "url" {
  description = "The URL of the Elastic Beanstalk environment"
  value       = aws_elastic_beanstalk_environment.app_env.endpoint_url
}
