import { z } from 'zod';
import { PublicationProvider } from './publication-provider.validation';
import { paginationValidationSchema } from '../common';

export const findPublicationProvidersValidationSchema = z.object({
  pagination: paginationValidationSchema,
});

export type FindPublicationProvidersRequest = z.infer<
  typeof findPublicationProvidersValidationSchema
>;

export type FindPublicationProvidersResponse = PublicationProvider[];
