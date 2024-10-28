import { z } from 'zod';
import { PublicationFile } from './publication-file.validation';
import { publicationId } from '../publication/publication.validation';

export const findPublicationFilesValidationSchema = z.object({
  publicationId,
});

export type FindPublicationFilesRequest = z.infer<
  typeof findPublicationFilesValidationSchema
>;

export type FindPublicationFilesResponse = PublicationFile[];
