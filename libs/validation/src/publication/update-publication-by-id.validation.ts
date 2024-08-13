import { z } from 'nestjs-zod/z';
import { Publication, publicationId } from './publication.validation';
import { createZodDto } from 'nestjs-zod';
import { updatePublicationPayloadValidationSchema } from './update-publication.validation';

export const updatePublicationByIdValidationSchema = z.object({
  id: publicationId,
  payload: updatePublicationPayloadValidationSchema,
});

export type UpdatePublicationByIdRequest = z.infer<
  typeof updatePublicationByIdValidationSchema
>;

export class UpdatePublicationByIdDto extends createZodDto(
  updatePublicationByIdValidationSchema,
) { }

export type UpdatePublicationByIdResponse = Publication;
