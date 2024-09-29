import { z } from 'zod';
import { Post } from './post.validation';
import { paginationValidationSchema } from '../common';

export const findPostsValidationSchema = z.object({
  pagination: paginationValidationSchema,
});

export type FindPostsRequest = z.infer<typeof findPostsValidationSchema>;

export type FindPostsResponse = Post[];
