import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const userId = z.number();
export const userEmail = z.string().email();
export const userPassword = z.string().min(8);
export const userProviderId = z.string().uuid();
export const userName = z.string().min(3).max(100).optional();
export const userBirthDate = z.date().optional();

const userValidationSchema = z.object({
  id: userId,
  email: userEmail,
  createdAt: z.date(),
  updatedAt: z.date(),
  providerId: userProviderId,
  name: userName,
  birthDate: userBirthDate,
})

export type User = z.infer<typeof userValidationSchema>

export class UserDto extends createZodDto(userValidationSchema) { }
