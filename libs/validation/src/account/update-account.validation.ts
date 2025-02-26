import { z } from 'nestjs-zod/z'
import { Account, accountId, accountName, accountStatus, accountUserId } from './account.validation'
import { createZodDto } from 'nestjs-zod'
import { accountProviderId } from '../account-provider'

export const updateAccountPayloadSchema = z.object({
  name: accountName,
  userId: accountUserId,
  providerId: accountProviderId,
  status: accountStatus,
})

export const updateAccountValidationSchema = z.object({
  id: accountId,
  payload: updateAccountPayloadSchema
})

export type UpdateAccountRequest = z.infer<typeof updateAccountValidationSchema>

export class UpdateAccountBodyDto extends createZodDto(updateAccountPayloadSchema) { }

export type UpdateAccountResponse = Account
