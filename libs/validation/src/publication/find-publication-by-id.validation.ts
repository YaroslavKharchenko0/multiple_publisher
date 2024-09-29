import { z } from 'zod';
import { Publication, publicationId } from './publication.validation';

export const findPublicationByIdValidationSchema = z.object({
  id: publicationId,
});

export type FindPublicationByIdRequest = z.infer<
  typeof findPublicationByIdValidationSchema
>;

export type FindPublicationByIdResponse = Publication;
