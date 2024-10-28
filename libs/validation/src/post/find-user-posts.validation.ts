import { z } from 'zod';
import { Post } from './post.validation';
import { PaginationMetadata, paginationValidationSchema } from '../common';
import { userId } from '../user';

export const findUserPostsValidationSchema = z.object({
  userId,
  pagination: paginationValidationSchema,
});

export type FindUserPostsRequest = z.infer<
  typeof findUserPostsValidationSchema
>;

export type FindUserPostsResponse = {
  posts: Post[];
  metadata: PaginationMetadata;
};
