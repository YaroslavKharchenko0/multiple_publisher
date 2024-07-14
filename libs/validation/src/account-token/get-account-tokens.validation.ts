import { z } from 'nestjs-zod/z'
import { accountId } from '../account/account.validation'
import { AccountToken } from './account-token.validation'
import { createZodDto } from 'nestjs-zod'

export const getAccountTokensValidationSchema = z.object({
  accountId,
})

export type GetAccountTokensRequest = z.infer<typeof getAccountTokensValidationSchema>

export class GetAccountTokensBodyDto extends createZodDto(getAccountTokensValidationSchema) { }

export type GetAccountTokensResponse = AccountToken[]
