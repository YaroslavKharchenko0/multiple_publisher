import { AccountStatus } from '@app/types'
import { z } from 'nestjs-zod/z'
import { accountProviderKey } from '../account-provider'
import { Account, accountInternalId, accountName, accountStatus, accountUserId } from './account.validation'
import { createZodDto } from 'nestjs-zod'

export const createAccountValidationSchema = z.object({
  provider: accountProviderKey,
  name: accountName,
  userId: accountUserId,
  status: accountStatus.default(AccountStatus.INACTIVE),
  internalId: accountInternalId,
})

export type CreateAccountRequest = z.infer<typeof createAccountValidationSchema>

export class CreateAccountBodyDto extends createZodDto(createAccountValidationSchema) { }

export type CreateAccountResponse = Account
