import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { UserRole } from './user-role.validation'
import { userId } from '../user/user.validation'

export const findUserRoleValidationSchema = z.object({
  userId: userId,
})

export type FindUserRoleRequest = z.infer<typeof findUserRoleValidationSchema>

export class FindUserRoleDto extends createZodDto(findUserRoleValidationSchema) { }

export type FindUserRoleResponse = UserRole
