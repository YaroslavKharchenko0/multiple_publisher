import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { User, userProviderId } from './user.validation'

export const findByProviderIdValidationSchema = z.object({
  providerId: userProviderId,
})

export type FindByProviderIdRequest = z.infer<typeof findByProviderIdValidationSchema>

export class FindByProviderIdBodyDto extends createZodDto(findByProviderIdValidationSchema) { }

export type FindByProviderIdResponse = User;
