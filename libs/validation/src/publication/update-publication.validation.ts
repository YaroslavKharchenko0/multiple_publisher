import { z } from 'nestjs-zod/z';
import {
  Publication,
  publicationDescription,
  publicationId,
  publicationStatus,
  publicationTitle,
} from './publication.validation';
import { createZodDto } from 'nestjs-zod';

export const updatePublicationPayloadValidationSchema = z.object({
  title: publicationTitle.optional(),
  description: publicationDescription.optional(),
  status: publicationStatus.optional(),
});

export const updatePublicationValidationSchema = z.object({
  id: publicationId,
  payload: updatePublicationPayloadValidationSchema,
});

export type UpdatePublicationRequest = z.infer<
  typeof updatePublicationValidationSchema
>;

export class UpdatePublicationDto extends createZodDto(
  updatePublicationPayloadValidationSchema,
) { }

export type UpdatePublicationResponse = Publication;
