variable "cidr_block" {
  description = "The CIDR block for the VPC"
  type        = string
}

variable "public_subnets" {
  description = "A list of public subnets"
  type        = list(string)
}

variable "private_subnets" {
  description = "List of private subnet CIDR blocks"
  type        = list(string)
}

variable "name" {
  description = "The name of the VPC"
  type        = string
}

variable "availability_zones" {
  description = "A list of availability zones"
  type        = list(string)
}
