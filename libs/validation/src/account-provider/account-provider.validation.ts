import { ProviderKey } from '@app/types'
import { z } from 'zod';

export const accountProviderKey = z.nativeEnum(ProviderKey)

export const accountProviderId = z.number()

export const accountProviderValidationSchema = z.object({
  id: accountProviderId,
  key: accountProviderKey
})

export type AccountProvider = z.infer<typeof accountProviderValidationSchema>

