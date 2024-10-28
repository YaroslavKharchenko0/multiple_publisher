import { z } from 'zod';
import {
  PublicationProvider,
  publicationProviderKey,
} from './publication-provider.validation';
import { accountProviderId } from '../account-provider';

export const createPublicationProviderValidationSchema = z.object({
  key: publicationProviderKey,
  accountProviderId,
});

export type CreatePublicationProviderRequest = z.infer<
  typeof createPublicationProviderValidationSchema
>;

export type CreatePublicationProviderResponse = PublicationProvider;
