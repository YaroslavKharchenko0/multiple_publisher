resource "aws_cognito_user_pool" "user_pool" {
  name = var.user_pool_name

  schema {
    attribute_data_type = "String"
    name                = "role"
    mutable             = true
    required            = false
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = var.user_pool_client_name
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
