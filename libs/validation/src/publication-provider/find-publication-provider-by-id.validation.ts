import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
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

export class FindPublicationProviderByIdDto extends createZodDto(
  findPublicationProviderByIdValidationSchema,
) { }

export type FindPublicationProviderByIdResponse = PublicationProvider;
