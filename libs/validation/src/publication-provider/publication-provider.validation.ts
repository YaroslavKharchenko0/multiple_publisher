import { z } from 'zod';
import { accountProviderId } from '../account-provider';
import { PublicationProvider as PublicationProviderEnum } from '@app/types';

export const publicationProviderId = z.number();
export const publicationProviderKey = z.nativeEnum(PublicationProviderEnum);

export const publicationProviderValidationSchema = z.object({
  id: publicationProviderId,
  key: publicationProviderKey,
  accountProviderId,
});

export type PublicationProvider = z.infer<
  typeof publicationProviderValidationSchema
>;
