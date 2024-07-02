import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const verifyEmailValidationSchema = z.object({
  code: z.string(),
  email: z.string().email(),
})

export type VerifyEmailRequest = z.infer<typeof verifyEmailValidationSchema>

export class VerifyEmailBodyDto extends createZodDto(verifyEmailValidationSchema) { }

export type VerifyEmailResponse = null;
