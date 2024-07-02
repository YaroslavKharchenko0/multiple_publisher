import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userBirthDate, userId, userName } from './user.validation'

export const updateUserValidationSchema = z.object({
  userId,
  name: userName,
  birthDate: userBirthDate,
})

export type UpdateUserRequest = z.infer<typeof updateUserValidationSchema>

const updateUserBodyValidationSchema = updateUserValidationSchema.omit({ userId: true })

export class UpdateUserBodyDto extends createZodDto(updateUserBodyValidationSchema) { }

export type UpdateUserResponse = null;
