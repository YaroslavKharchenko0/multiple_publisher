import { z } from 'zod';
import { PublicationProvider } from './publication-provider.validation';
import { accountProviderId } from '../account-provider';

export const findPublicationProvidersByAccountProviderValidationSchema =
  z.object({
    accountProviderId,
  });

export type FindPublicationProvidersByAccountProviderRequest = z.infer<
  typeof findPublicationProvidersByAccountProviderValidationSchema
>;

export type FindPublicationProvidersByAccountProviderResponse =
  PublicationProvider[];
