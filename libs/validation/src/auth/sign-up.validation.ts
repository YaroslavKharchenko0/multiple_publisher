import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userBirthDate, userEmail, userName, userPassword } from '../user/user.validation';

export const signUpValidationSchema = z.object({
  password: userPassword,
  email: userEmail,
  name: userName,
  birthDate: userBirthDate,
})

export type SignUpRequest = z.infer<typeof signUpValidationSchema>

export class SignUpBodyDto extends createZodDto(signUpValidationSchema) { }

export type SignUpResponse = null;
