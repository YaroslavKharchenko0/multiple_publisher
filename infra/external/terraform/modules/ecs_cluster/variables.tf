variable "env" {
  description = "The environment for the ECS cluster"
  type        = string
}

variable "log_retention_in_days" {
  description = "Number of days to retain log events in the log group"
  type        = number
  default     = 7
}
