import { z } from 'zod';
import { Publication, publicationId } from './publication.validation';
import { postId } from '../post';

export const deletePublicationValidationSchema = z.object({
  id: publicationId,
  postId,
});

export type DeletePublicationRequest = z.infer<
  typeof deletePublicationValidationSchema
>;

export type DeletePublicationResponse = Publication;
