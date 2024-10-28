import { z } from 'zod';
import { accountId } from '../account/account.validation'
import { AccountToken } from './account-token.validation'

export const getAccountTokensValidationSchema = z.object({
  accountId,
})

export type GetAccountTokensRequest = z.infer<typeof getAccountTokensValidationSchema>

export type GetAccountTokensResponse = AccountToken[]
