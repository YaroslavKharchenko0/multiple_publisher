import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { User, userEmail } from './user.validation'

export const findByEmailValidationSchema = z.object({
  email: userEmail,
})

export type FindByEmailRequest = z.infer<typeof findByEmailValidationSchema>

export class FindByEmailBodyDto extends createZodDto(findByEmailValidationSchema) { }

export type FindByEmailResponse = User;
