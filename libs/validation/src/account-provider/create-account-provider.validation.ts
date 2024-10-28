import { z } from 'zod';
import { AccountProvider, accountProviderKey } from './account-provider.validation'

export const createAccountProviderValidationSchema = z.object({
  key: accountProviderKey
})

export type CreateAccountProviderRequest = z.infer<typeof createAccountProviderValidationSchema>

export type CreateAccountProviderResponse = AccountProvider;

