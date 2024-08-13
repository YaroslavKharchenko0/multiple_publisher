import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PublicationProvider } from './publication-provider.validation';
import { accountProviderId } from '../account-provider';

export const findPublicationProvidersByAccountProviderValidationSchema =
  z.object({
    accountProviderId,
  });

export type FindPublicationProvidersByAccountProviderRequest = z.infer<
  typeof findPublicationProvidersByAccountProviderValidationSchema
>;

export class FindPublicationProvidersByAccountProviderDto extends createZodDto(
  findPublicationProvidersByAccountProviderValidationSchema,
) { }

export type FindPublicationProvidersByAccountProviderResponse =
  PublicationProvider[];
