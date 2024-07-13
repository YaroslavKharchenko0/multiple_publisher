import { z } from 'nestjs-zod/z'
import { AccountProvider, accountProviderKey } from './account-provider.validation'
import { createZodDto } from 'nestjs-zod';


export const createAccountProviderValidationSchema = z.object({
  key: accountProviderKey
})

export type CreateAccountProviderRequest = z.infer<typeof createAccountProviderValidationSchema>

export class CreateAccountProviderBodyDto extends createZodDto(createAccountProviderValidationSchema) { }

export type CreateAccountProviderResponse = AccountProvider;

