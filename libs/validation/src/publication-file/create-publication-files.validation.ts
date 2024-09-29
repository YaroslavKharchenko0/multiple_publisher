import { z } from 'zod';
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


export type CreatePublicationFilesResponse = PublicationFile[];
