import { z } from 'zod';
import { AccountProvider } from './account-provider.validation'
import { paginationValidationSchema } from '../common';

export const findAccountProvidersValidationSchema = z.object({
  pagination: paginationValidationSchema
})

export type FindAccountProvidersRequest = z.infer<typeof findAccountProvidersValidationSchema>

export type FindAccountProvidersResponse = AccountProvider[];

