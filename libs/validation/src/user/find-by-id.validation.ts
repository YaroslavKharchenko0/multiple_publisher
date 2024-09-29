import { z } from 'zod'
import { User, userId } from './user.validation'

export const findByIdValidationSchema = z.object({
  id: userId,
})

export type FindByIdRequest = z.infer<typeof findByIdValidationSchema>

export type FindByIdResponse = User;
