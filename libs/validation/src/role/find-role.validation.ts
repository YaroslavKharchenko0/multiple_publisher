import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { Role, role } from './role.validation'

export const findRoleValidationSchema = z.object({
  role,
})

export type FindRoleRequest = z.infer<typeof findRoleValidationSchema>

export class FindRoleBodyDto extends createZodDto(findRoleValidationSchema) { }

export type FindRoleResponse = Role;
