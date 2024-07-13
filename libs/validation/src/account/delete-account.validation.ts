import { z } from 'nestjs-zod/z'
import { Account, accountId } from './account.validation'
import { createZodDto } from 'nestjs-zod'

export const deleteAccountValidationSchema = z.object({
  id: accountId
})

export type DeleteAccountRequest = z.infer<typeof deleteAccountValidationSchema>

export class DeleteAccountBodyDto extends createZodDto(deleteAccountValidationSchema) { }

export type DeleteAccountResponse = Account
