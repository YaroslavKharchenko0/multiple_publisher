import { z } from 'zod';
import { Publication, publicationId } from './publication.validation';
import { postId } from '../post';

export const findPublicationValidationSchema = z.object({
  id: publicationId,
  postId,
});

export type FindPublicationRequest = z.infer<
  typeof findPublicationValidationSchema
>;

export type FindPublicationResponse = Publication;
