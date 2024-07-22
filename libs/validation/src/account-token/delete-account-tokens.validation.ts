import { z } from 'nestjs-zod/z'
import { accountId } from '../account/account.validation'
import { AccountToken } from './account-token.validation'
import { createZodDto } from 'nestjs-zod'

export const deleteAccountTokensValidationSchema = z.object({
  accountId,
})

export type DeleteAccountTokensRequest = z.infer<typeof deleteAccountTokensValidationSchema>

export class DeleteAccountTokensBodyDto extends createZodDto(deleteAccountTokensValidationSchema) { }

export type DeleteAccountTokensResponse = AccountToken[]
