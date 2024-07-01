import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const signInValidationSchema = z.object({
  username: z.string().min(6).max(50),
  password: z.string(),
})

export type SignInRequest = z.infer<typeof signInValidationSchema>

export class SignInBodyDto extends createZodDto(signInValidationSchema) { }

export const signInResponseSchema = z.object({
  idToken: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
})

export type SignInResponse = z.infer<typeof signInResponseSchema>
