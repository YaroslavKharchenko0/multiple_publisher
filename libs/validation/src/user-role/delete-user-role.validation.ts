import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { userId } from '../user/user.validation'

export const deleteUserRoleValidationSchema = z.object({
  userId: userId,
})

export type DeleteUserRoleRequest = z.infer<typeof deleteUserRoleValidationSchema>

export class DeleteUserRoleDto extends createZodDto(deleteUserRoleValidationSchema) { }

export type DeleteUserRoleResponse = null
