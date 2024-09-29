import { z } from 'zod';
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

export type DeletePublicationProviderResponse = PublicationProvider;
