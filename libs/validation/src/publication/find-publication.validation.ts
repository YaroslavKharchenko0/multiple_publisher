import { z } from 'nestjs-zod/z';
import { Publication, publicationId } from './publication.validation';
import { createZodDto } from 'nestjs-zod';
import { postId } from '../post';

export const findPublicationValidationSchema = z.object({
  id: publicationId,
  postId,
});

export type FindPublicationRequest = z.infer<
  typeof findPublicationValidationSchema
>;

export class FindPublicationDto extends createZodDto(
  findPublicationValidationSchema,
) { }

export type FindPublicationResponse = Publication;
