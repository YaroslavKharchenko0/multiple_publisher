import { z } from 'zod'
import { UserRole } from './user-role.validation'
import { userId } from '../user/user.validation'

export const findUserRoleValidationSchema = z.object({
  userId: userId,
})

export type FindUserRoleRequest = z.infer<typeof findUserRoleValidationSchema>

export type FindUserRoleResponse = UserRole
