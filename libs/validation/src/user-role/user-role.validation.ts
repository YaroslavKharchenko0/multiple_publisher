import { z } from 'zod'
import { userId } from '../user/user.validation'
import { roleId } from '../role'

export const userRoleValidationSchema = z.object({
  id: z.number(),
  userId: userId,
  roleId: roleId,
})

export type UserRole = z.infer<typeof userRoleValidationSchema>
