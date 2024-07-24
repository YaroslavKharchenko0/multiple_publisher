import { z } from 'nestjs-zod/z';
import {
  Publication,
  publicationDescription,
  publicationTitle,
} from './publication.validation';
import { postId } from '../post';
import { accountId } from '../account';
import { createZodDto } from 'nestjs-zod';

export const createPublicationValidationSchema = z.object({
  title: publicationTitle.optional(),
  description: publicationDescription.optional(),
  postId,
  accountId,
});

export type CreatePublicationRequest = z.infer<
  typeof createPublicationValidationSchema
>;

export class CreatePublicationDto extends createZodDto(
  createPublicationValidationSchema.omit({ postId: true }),
) { }

export type CreatePublicationResponse = Publication;
