import { z } from 'zod';
import {
  Publication,
  publicationDescription,
  publicationId,
  publicationStatus,
  publicationTitle,
} from './publication.validation';
import { postId } from '../post';

export const updatePublicationPayloadValidationSchema = z.object({
  title: publicationTitle.optional(),
  description: publicationDescription.optional(),
  status: publicationStatus.optional(),
});

export const updatePublicationValidationSchema = z.object({
  id: publicationId,
  postId,
  payload: updatePublicationPayloadValidationSchema,
});

export type UpdatePublicationRequest = z.infer<
  typeof updatePublicationValidationSchema
>;

export type UpdatePublicationPayload = z.infer<
  typeof updatePublicationPayloadValidationSchema
>;

export type UpdatePublicationResponse = Publication;
