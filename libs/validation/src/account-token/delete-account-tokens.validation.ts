import { z } from 'zod';
import { accountId } from '../account/account.validation'
import { AccountToken } from './account-token.validation'

export const deleteAccountTokensValidationSchema = z.object({
  accountId,
})

export type DeleteAccountTokensRequest = z.infer<typeof deleteAccountTokensValidationSchema>

export type DeleteAccountTokensResponse = AccountToken[]
