import { z } from 'nestjs-zod/z';
import { Publication, publicationId } from './publication.validation';
import { createZodDto } from 'nestjs-zod';
import { postId } from '../post';

export const deletePublicationValidationSchema = z.object({
  id: publicationId,
  postId,
});

export type DeletePublicationRequest = z.infer<
  typeof deletePublicationValidationSchema
>;

export class DeletePublicationDto extends createZodDto(
  deletePublicationValidationSchema,
) { }

export type DeletePublicationResponse = Publication;
