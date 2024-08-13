import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PublicationFile } from './publication-file.validation';
import { publicationId } from '../publication/publication.validation';

export const findPublicationFilesValidationSchema = z.object({
  publicationId,
});

export type FindPublicationFilesRequest = z.infer<
  typeof findPublicationFilesValidationSchema
>;

export class FindPublicationFilesDto extends createZodDto(
  findPublicationFilesValidationSchema,
) { }

export type FindPublicationFilesResponse = PublicationFile[];
