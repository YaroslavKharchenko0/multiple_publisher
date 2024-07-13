import { z } from 'nestjs-zod/z'
import { AccountProvider, accountProviderKey } from './account-provider.validation'
import { createZodDto } from 'nestjs-zod';


export const findAccountProviderValidationSchema = z.object({
  key: accountProviderKey
})

export type FindAccountProviderRequest = z.infer<typeof findAccountProviderValidationSchema>

export class FindAccountProviderBodyDto extends createZodDto(findAccountProviderValidationSchema) { }

export type FindAccountProviderResponse = AccountProvider;

