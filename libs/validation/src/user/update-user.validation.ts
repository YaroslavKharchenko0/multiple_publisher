import { z } from 'zod'
import { userBirthDate, userId, userName } from './user.validation'

export const updateUserValidationSchema = z.object({
  userId,
  name: userName,
  birthDate: userBirthDate,
})

export type UpdateUserRequest = z.infer<typeof updateUserValidationSchema>

export const updateUserBodyValidationSchema = updateUserValidationSchema.omit({ userId: true })

export type UpdateUserResponse = null;
