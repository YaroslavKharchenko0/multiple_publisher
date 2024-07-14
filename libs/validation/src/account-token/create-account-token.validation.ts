import { z } from 'nestjs-zod/z'
import { accountId } from '../account/account.validation'
import { AccountToken, accountToken, accountTokenType } from './account-token.validation'
import { createZodDto } from 'nestjs-zod'

export const createAccountTokenValidationSchema = z.object({
  accountId,
  token: accountToken,
  type: accountTokenType,
})

export type CreateAccountTokenRequest = z.infer<typeof createAccountTokenValidationSchema>

export class CreateAccountTokenBodyDto extends createZodDto(createAccountTokenValidationSchema) { }

export type CreateAccountTokenResponse = AccountToken
