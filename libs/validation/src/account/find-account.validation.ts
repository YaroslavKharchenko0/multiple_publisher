import { z } from 'nestjs-zod/z'
import { Account, accountId } from './account.validation'
import { createZodDto } from 'nestjs-zod'

export const findAccountValidationSchema = z.object({
  id: accountId
})

export type FindAccountRequest = z.infer<typeof findAccountValidationSchema>

export class FindAccountBodyDto extends createZodDto(findAccountValidationSchema) { }

export type FindAccountResponse = Account
