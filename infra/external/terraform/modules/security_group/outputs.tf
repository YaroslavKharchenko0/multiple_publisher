
output "security_group_id" {
  description = "The ID of the security group"
  value       = aws_security_group.rds_security_group.id
}


output "alb_sc_group_id" {
  value = aws_security_group.alb_sg.id
  description = "The ID of the security group"
}


output "ecs_sc_group_id" {
  value = aws_security_group.ecs_task_sg.id
  description = "The ID of the security group"
}
