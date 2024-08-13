import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import {
  PublicationProvider,
  publicationProviderKey,
} from './publication-provider.validation';

export const findPublicationProviderValidationSchema = z.object({
  key: publicationProviderKey,
});

export type FindPublicationProviderRequest = z.infer<
  typeof findPublicationProviderValidationSchema
>;

export class FindPublicationProviderDto extends createZodDto(
  findPublicationProviderValidationSchema,
) { }

export type FindPublicationProviderResponse = PublicationProvider;
