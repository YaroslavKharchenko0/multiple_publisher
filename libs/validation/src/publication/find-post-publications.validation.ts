import { z } from 'zod';
import { Publication } from './publication.validation';
import { postId } from '../post';
import { paginationValidationSchema } from '../common';

export const findPostPublicationsValidationSchema = z.object({
  postId,
  pagination: paginationValidationSchema,
});

export type FindPostPublicationsRequest = z.infer<
  typeof findPostPublicationsValidationSchema
>;

export type FindPostPublicationsResponse = Publication[];
