import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { Role, role } from './role.validation'

export const createRoleValidationSchema = z.object({
  role,
})

export type CreateRoleRequest = z.infer<typeof createRoleValidationSchema>

export class CreateRoleBodyDto extends createZodDto(createRoleValidationSchema) { }

export type CreateRoleResponse = Role;
