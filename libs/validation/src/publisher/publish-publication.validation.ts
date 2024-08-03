import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
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

export class PublishPublicationDto extends createZodDto(
  publishPublicationValidationSchema.omit({
    publicationId: true,
    postId: true,
  }),
) { }

export type PublishPublicationResponse = null;
