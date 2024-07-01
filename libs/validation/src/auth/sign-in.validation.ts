import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userEmail, userPassword } from '../user/user.validation'

export const signInValidationSchema = z.object({
  email: userEmail,
  password: userPassword,
})

export type SignInRequest = z.infer<typeof signInValidationSchema>

export class SignInBodyDto extends createZodDto(signInValidationSchema) { }

export const signInResponseSchema = z.object({
  idToken: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type SignInResponse = z.infer<typeof signInResponseSchema>
