import { z } from 'zod';
import { AccountProvider, accountProviderKey } from './account-provider.validation'


export const findAccountProviderValidationSchema = z.object({
  key: accountProviderKey
})

export type FindAccountProviderRequest = z.infer<typeof findAccountProviderValidationSchema>

export type FindAccountProviderResponse = AccountProvider;

