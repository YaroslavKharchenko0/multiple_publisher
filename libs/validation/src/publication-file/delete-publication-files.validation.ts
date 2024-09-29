import { z } from 'zod';
import { PublicationFile } from './publication-file.validation';
import { publicationId } from '../publication/publication.validation';

export const deletePublicationFilesValidationSchema = z.object({
  publicationId,
});

export type DeletePublicationFilesRequest = z.infer<
  typeof deletePublicationFilesValidationSchema
>;

export type DeletePublicationFilesResponse = PublicationFile[];
