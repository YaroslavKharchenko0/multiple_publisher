import { z } from 'zod';
import { Account, accountId } from './account.validation'

export const findAccountValidationSchema = z.object({
  id: accountId
})

export type FindAccountRequest = z.infer<typeof findAccountValidationSchema>

export type FindAccountResponse = Account
