import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const userId = z.number();
export const userEmail = z.string().email();
export const userPassword = z.string().min(8);
export const userProviderId = z.string().uuid();

const userValidationSchema = z.object({
  id: userId,
  email: userEmail,
  createdAt: z.date(),
  updatedAt: z.date(),
  providerId: userProviderId,
})

export type User = z.infer<typeof userValidationSchema>

export class UserDto extends createZodDto(userValidationSchema) { }
