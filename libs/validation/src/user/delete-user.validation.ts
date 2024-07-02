import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userId } from './user.validation'

export const deleteUserValidationSchema = z.object({
  id: userId,
})

export type DeleteUserRequest = z.infer<typeof deleteUserValidationSchema>

export class DeleteUserBodyDto extends createZodDto(deleteUserValidationSchema) { }

export type DeleteUserResponse = null;

