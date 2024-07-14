import { z } from 'nestjs-zod/z'
import { accountId } from '../account/account.validation'
import { AccountTokenType } from '@app/types'
import { createZodDto } from 'nestjs-zod'

export const accountTokenType = z.nativeEnum(AccountTokenType)
export const accountTokenId = z.number()
export const accountToken = z.string()

export const accountTokenValidationSchema = z.object({
  id: accountTokenId,
  accountId,
  token: accountToken,
  type: accountTokenType,
  createdAt: z.date(),
})

export type AccountToken = z.infer<typeof accountTokenValidationSchema>

export class AccountTokenDto extends createZodDto(accountTokenValidationSchema) { }
