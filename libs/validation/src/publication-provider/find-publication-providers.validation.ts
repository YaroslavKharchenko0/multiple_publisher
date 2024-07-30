import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PublicationProvider } from './publication-provider.validation';
import { paginationValidationSchema } from '../common';

export const findPublicationProvidersValidationSchema = z.object({
  pagination: paginationValidationSchema,
});

export type FindPublicationProvidersRequest = z.infer<
  typeof findPublicationProvidersValidationSchema
>;

export class FindPublicationProvidersDto extends createZodDto(
  findPublicationProvidersValidationSchema,
) { }

export type FindPublicationProvidersResponse = PublicationProvider[];
