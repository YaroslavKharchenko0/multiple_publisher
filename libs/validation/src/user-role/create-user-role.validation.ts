import { z } from 'nestjs-zod/z'
import { role } from '../role'
import { createZodDto } from 'nestjs-zod'
import { UserRole } from './user-role.validation'

export const createUserRoleValidationSchema = z.object({
  userId: z.number(),
  role,
})

export type CreateUserRoleRequest = z.infer<typeof createUserRoleValidationSchema>

export class CreateUserRoleBodyDto extends createZodDto(createUserRoleValidationSchema) { }

export type CreateUserRoleResponse = UserRole
