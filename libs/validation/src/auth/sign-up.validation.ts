import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const signUpValidationSchema = z.object({
  password: z.string(),
  email: z.string().email(),
})

export type SignUpRequest = z.infer<typeof signUpValidationSchema>

export class SignUpBodyDto extends createZodDto(signUpValidationSchema) { }

export type SignUpResponse = null;
