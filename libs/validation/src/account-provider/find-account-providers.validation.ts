import { z } from 'nestjs-zod/z'
import { AccountProvider } from './account-provider.validation'
import { createZodDto } from 'nestjs-zod';
import { paginationValidationSchema } from '../common';

export const findAccountProvidersValidationSchema = z.object({
  pagination: paginationValidationSchema
})

export type FindAccountProvidersRequest = z.infer<typeof findAccountProvidersValidationSchema>

export class FindAccountProvidersBodyDto extends createZodDto(findAccountProvidersValidationSchema) { }

export type FindAccountProvidersResponse = AccountProvider[];

