import { z } from 'zod';
import { accountProviderId } from '../account-provider';
import { PublicationProvider as PublicationProviderEnum } from '@app/types';

export const publicationProviderId = z
  .number()
  .describe('Publication provider id');
export const publicationProviderKey = z
  .nativeEnum(PublicationProviderEnum)
  .describe('Publication provider key');

export const publicationProviderValidationSchema = z.object({
  id: publicationProviderId,
  key: publicationProviderKey,
  accountProviderId,
});

export type PublicationProvider = z.infer<
  typeof publicationProviderValidationSchema
>;
