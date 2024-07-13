import { z } from 'nestjs-zod/z'
import { Account, accountId, accountName, accountStatus, accountUserId } from './account.validation'
import { createZodDto } from 'nestjs-zod'
import { accountProviderId } from '../account-provider'

export const updateAccountValidationSchema = z.object({
  id: accountId,
  payload: z.object({
    name: accountName,
    userId: accountUserId,
    providerId: accountProviderId,
    status: accountStatus,
  })
})

export type UpdateAccountRequest = z.infer<typeof updateAccountValidationSchema>

export class UpdateAccountBodyDto extends createZodDto(updateAccountValidationSchema) { }

export type UpdateAccountResponse = Account
