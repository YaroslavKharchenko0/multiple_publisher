import { z } from 'zod';
import { AccountProvider } from './account-provider.validation';
import { PaginationMetadata, paginationValidationSchema } from '../common';

export const findAccountProvidersValidationSchema = z.object({
  pagination: paginationValidationSchema,
});

export type FindAccountProvidersRequest = z.infer<
  typeof findAccountProvidersValidationSchema
>;

export type FindAccountProvidersResponse = {
  accounts: AccountProvider[];
  metadata: PaginationMetadata;
};
