import { z } from 'zod'
import { role } from '../role'
import { UserRole } from './user-role.validation'

export const createUserRoleValidationSchema = z.object({
  userId: z.number(),
  role,
})

export type CreateUserRoleRequest = z.infer<typeof createUserRoleValidationSchema>

export const createUserRoleBodyValidationSchema = createUserRoleValidationSchema.omit({ userId: true })

export type CreateUserRoleResponse = UserRole
