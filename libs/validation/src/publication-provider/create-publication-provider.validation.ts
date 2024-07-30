import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
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

export class CreatePublicationProviderDto extends createZodDto(
  createPublicationProviderValidationSchema,
) { }

export type CreatePublicationProviderResponse = PublicationProvider;
