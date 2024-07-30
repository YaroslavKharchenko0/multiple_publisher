import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import {
  PublicationProvider,
  publicationProviderKey,
} from './publication-provider.validation';
import { accountProviderId } from '../account-provider';

export const deletePublicationProviderValidationSchema = z.object({
  key: publicationProviderKey,
  accountProviderId,
});

export type DeletePublicationProviderRequest = z.infer<
  typeof deletePublicationProviderValidationSchema
>;

export class DeletePublicationProviderDto extends createZodDto(
  deletePublicationProviderValidationSchema,
) { }

export type DeletePublicationProviderResponse = PublicationProvider;
