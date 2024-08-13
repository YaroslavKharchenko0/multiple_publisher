import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import {
  PublicationProvider,
  publicationProviderKey,
} from './publication-provider.validation';

export const deletePublicationProviderValidationSchema = z.object({
  key: publicationProviderKey,
});

export type DeletePublicationProviderRequest = z.infer<
  typeof deletePublicationProviderValidationSchema
>;

export class DeletePublicationProviderDto extends createZodDto(
  deletePublicationProviderValidationSchema,
) { }

export type DeletePublicationProviderResponse = PublicationProvider;
