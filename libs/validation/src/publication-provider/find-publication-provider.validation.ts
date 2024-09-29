import { z } from 'zod';
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

export type FindPublicationProviderResponse = PublicationProvider;
