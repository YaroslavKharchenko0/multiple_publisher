import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userEmail, userPassword } from '../user/user.validation';

export const signUpValidationSchema = z.object({
  password: userPassword,
  email: userEmail,
})

export type SignUpRequest = z.infer<typeof signUpValidationSchema>

export class SignUpBodyDto extends createZodDto(signUpValidationSchema) { }

export type SignUpResponse = null;
