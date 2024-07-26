import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { fileId } from '../file';
import {
  PublicationFile,
  publicationFileIsOriginal,
} from './publication-file.validation';
import { publicationId } from '../publication/publication.validation';

export const createPublicationFilesValidationSchema = z.object({
  publicationId,
  files: z.array(fileId),
  isOriginal: publicationFileIsOriginal,
});

export type CreatePublicationFilesRequest = z.infer<
  typeof createPublicationFilesValidationSchema
>;

export class CreatePublicationFilesDto extends createZodDto(
  createPublicationFilesValidationSchema.omit({
    publicationId: true,
    isOriginal: true,
  }),
) { }

export type CreatePublicationFilesResponse = PublicationFile[];
