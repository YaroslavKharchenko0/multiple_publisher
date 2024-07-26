import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { PublicationFile } from './publication-file.validation';
import { publicationId } from '../publication/publication.validation';

export const deletePublicationFilesValidationSchema = z.object({
  publicationId,
});

export type DeletePublicationFilesRequest = z.infer<
  typeof deletePublicationFilesValidationSchema
>;

export class DeletePublicationFilesDto extends createZodDto(
  deletePublicationFilesValidationSchema,
) { }

export type DeletePublicationFilesResponse = PublicationFile[];
