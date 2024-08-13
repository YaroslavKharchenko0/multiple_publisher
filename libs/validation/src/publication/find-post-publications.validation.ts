import { z } from 'nestjs-zod/z';
import { Publication } from './publication.validation';
import { createZodDto } from 'nestjs-zod';
import { postId } from '../post';
import { paginationValidationSchema } from '../common';

export const findPostPublicationsValidationSchema = z.object({
  postId,
  pagination: paginationValidationSchema,
});

export type FindPostPublicationsRequest = z.infer<
  typeof findPostPublicationsValidationSchema
>;

export class FindPostPublicationsDto extends createZodDto(
  paginationValidationSchema,
) { }

export type FindPostPublicationsResponse = Publication[];
