import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const signUpValidationSchema = z.object({
  username: z.string().min(6).max(50),
  password: z.string(),
  email: z.string().email(),
})

export type SignUpRequest = z.infer<typeof signUpValidationSchema>

export class SignUpBodyDto extends createZodDto(signUpValidationSchema) { }

export type SignUpResponse = null;
