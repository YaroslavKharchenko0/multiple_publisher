import { z } from 'zod'
import { userId } from '../user/user.validation'

export const deleteUserRoleValidationSchema = z.object({
  userId: userId,
})

export type DeleteUserRoleRequest = z.infer<typeof deleteUserRoleValidationSchema>

export type DeleteUserRoleResponse = null
