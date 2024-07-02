resource "aws_cognito_user_pool" "user_pool" {
  name = var.user_pool_name

  auto_verified_attributes = ["email"]

  schema {
    attribute_data_type = "String"
    name                = "role"
    mutable             = true
    required            = false
  }

  schema {
    attribute_data_type = "String"
    name                = "app_id"
    mutable             = true
    required            = false
  }

  verification_message_template {
    default_email_option  = "CONFIRM_WITH_CODE"
    email_message         = "Your verification code is {####}"
    email_message_by_link = "Click the link below to verify your email address: {##Verify Email##}"
    email_subject         = "Verify your email for our app"
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = var.user_pool_client_name
  user_pool_id = aws_cognito_user_pool.user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_CUSTOM_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_ADMIN_USER_PASSWORD_AUTH"
  ]
}
