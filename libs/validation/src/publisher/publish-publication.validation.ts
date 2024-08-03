import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';
import { publicationId } from '../publication';

export const publishPublicationValidationSchema = z
  .object({
    publicationId,
    publishAt: z.date(),
  })
  .required();

export type PublishPublicationRequest = z.infer<
  typeof publishPublicationValidationSchema
>;

export class PublishPublicationDto extends createZodDto(
  publishPublicationValidationSchema.omit({ publicationId: true }),
) { }

export const publishPublicationResponseValidationSchema = z.object({
  status: z.enum(['success', 'error']),
});

export type PublishPublicationResponse = z.infer<
  typeof publishPublicationResponseValidationSchema
>;
