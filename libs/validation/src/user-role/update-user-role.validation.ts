import { z } from 'nestjs-zod/z'
import { role } from '../role'
import { createZodDto } from 'nestjs-zod'
import { UserRole } from './user-role.validation'

export const updateUserRoleValidationSchema = z.object({
  userId: z.number(),
  role,
})

export type UpdateUserRoleRequest = z.infer<typeof updateUserRoleValidationSchema>

const updateUserRoleBodyDtoValidation = updateUserRoleValidationSchema.omit({ userId: true })

export class UpdateUserRoleBodyDto extends createZodDto(updateUserRoleBodyDtoValidation) { }

export type UpdateUserRoleResponse = UserRole
