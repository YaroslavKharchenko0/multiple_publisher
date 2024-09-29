import { ProviderKey } from '@app/types'
import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

export const accountProviderKey = z.nativeEnum(ProviderKey)

export const accountProviderId = z.number()

export const accountProviderValidationSchema = z.object({
  id: accountProviderId,
  key: accountProviderKey
})

export type AccountProvider = z.infer<typeof accountProviderValidationSchema>

export class AccountProviderDto extends createZodDto(accountProviderValidationSchema) { }
