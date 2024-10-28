import { z } from 'zod';
import { AccountProvider, accountProviderKey } from './account-provider.validation'

export const deleteAccountProviderValidationSchema = z.object({
  key: accountProviderKey
})

export type DeleteAccountProviderRequest = z.infer<typeof deleteAccountProviderValidationSchema>

export type DeleteAccountProviderResponse = AccountProvider;

