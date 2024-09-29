import { z } from 'zod';
import { accountId } from '../account/account.validation'
import { AccountToken, accountToken, accountTokenType } from './account-token.validation'

export const createAccountTokenValidationSchema = z.object({
  accountId,
  token: accountToken,
  type: accountTokenType,
})

export type CreateAccountTokenRequest = z.infer<typeof createAccountTokenValidationSchema>

export type CreateAccountTokenResponse = AccountToken
