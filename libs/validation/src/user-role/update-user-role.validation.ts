import { z } from 'zod'
import { role } from '../role'
import { UserRole } from './user-role.validation'

export const updateUserRoleValidationSchema = z.object({
  userId: z.number(),
  role,
})

export type UpdateUserRoleRequest = z.infer<typeof updateUserRoleValidationSchema>

export const updateUserRoleBodyDtoValidation =
  updateUserRoleValidationSchema.omit({ userId: true });

export type UpdateUserRoleResponse = UserRole
