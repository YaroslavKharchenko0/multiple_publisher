import { z } from 'nestjs-zod/z'
import { Account, accountId } from './account.validation'
import { createZodDto } from 'nestjs-zod'

export const updateAccountValidationSchema = z.object({
  id: accountId
})

export type UpdateAccountRequest = z.infer<typeof updateAccountValidationSchema>

export class UpdateAccountBodyDto extends createZodDto(updateAccountValidationSchema) { }

export type UpdateAccountResponse = Account
