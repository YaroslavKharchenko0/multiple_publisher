import { z } from 'zod'
import { User, userEmail } from './user.validation'

export const findByEmailValidationSchema = z.object({
  email: userEmail,
})

export type FindByEmailRequest = z.infer<typeof findByEmailValidationSchema>
export type FindByEmailResponse = User;
