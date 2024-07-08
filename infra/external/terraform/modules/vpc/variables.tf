variable "cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "public_subnets" {
  description = "A list of public subnets"
  type        = list(string)
}

variable "name" {
  description = "The name of the VPC"
  type        = string
}
