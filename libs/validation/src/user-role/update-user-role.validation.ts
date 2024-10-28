import { z } from 'zod'
import { role } from '../role'
import { UserRole } from './user-role.validation'
import { userId } from '../user'

export const updateUserRoleValidationSchema = z.object({
  userId,
  role,
})

export type UpdateUserRoleRequest = z.infer<typeof updateUserRoleValidationSchema>

export const updateUserRoleBodyDtoValidation =
  updateUserRoleValidationSchema.omit({ userId: true });

export type UpdateUserRoleResponse = UserRole
