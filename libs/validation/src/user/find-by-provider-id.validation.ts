import { z } from 'zod'
import { User, userProviderId } from './user.validation'

export const findByProviderIdValidationSchema = z.object({
  providerId: userProviderId,
})

export type FindByProviderIdRequest = z.infer<typeof findByProviderIdValidationSchema>

export type FindByProviderIdResponse = User;
