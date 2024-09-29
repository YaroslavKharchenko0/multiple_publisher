import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userId } from '../user/user.validation'
import { roleId } from '../role'

export const userRoleValidationSchema = z.object({
  id: z.number(),
  userId: userId,
  roleId: roleId,
})

export type UserRole = z.infer<typeof userRoleValidationSchema>

export class UserRoleDto extends createZodDto(userRoleValidationSchema) { }
