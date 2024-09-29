import { z } from 'zod';
import { publicationId } from '../publication';
import { postId } from '../post';

export const publishPublicationValidationSchema = z
  .object({
    publicationId,
    postId,
    publishAt: z.date(),
  })
  .required();

export type PublishPublicationRequest = z.infer<
  typeof publishPublicationValidationSchema
>;

export type PublishPublicationResponse = null;
