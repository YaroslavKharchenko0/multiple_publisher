import { z } from 'zod';
import { Publication, publicationId } from './publication.validation';
import { updatePublicationPayloadValidationSchema } from './update-publication.validation';

export const updatePublicationByIdValidationSchema = z.object({
  id: publicationId,
  payload: updatePublicationPayloadValidationSchema,
});

export type UpdatePublicationByIdRequest = z.infer<
  typeof updatePublicationByIdValidationSchema
>;

export type UpdatePublicationByIdResponse = Publication;
