import { z } from 'zod';
import {
  PublicationProvider,
  publicationProviderId,
} from './publication-provider.validation';

export const findPublicationProviderByIdValidationSchema = z.object({
  id: publicationProviderId,
});

export type FindPublicationProviderByIdRequest = z.infer<
  typeof findPublicationProviderByIdValidationSchema
>;

export type FindPublicationProviderByIdResponse = PublicationProvider;
