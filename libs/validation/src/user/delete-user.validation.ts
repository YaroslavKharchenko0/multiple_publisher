import { z } from 'zod'
import { userId } from './user.validation'

export const deleteUserValidationSchema = z.object({
  id: userId,
})

export type DeleteUserRequest = z.infer<typeof deleteUserValidationSchema>

export type DeleteUserResponse = null;

