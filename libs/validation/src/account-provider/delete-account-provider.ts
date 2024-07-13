import { z } from 'nestjs-zod/z'
import { AccountProvider, accountProviderKey } from './account-provider.validation'
import { createZodDto } from 'nestjs-zod';


export const deleteAccountProviderValidationSchema = z.object({
  key: accountProviderKey
})

export type DeleteAccountProviderRequest = z.infer<typeof deleteAccountProviderValidationSchema>

export class DeleteAccountProviderBodyDto extends createZodDto(deleteAccountProviderValidationSchema) { }

export type DeleteAccountProviderResponse = AccountProvider;

