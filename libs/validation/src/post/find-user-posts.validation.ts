import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { Post } from './post.validation';
import { paginationValidationSchema } from '../common';
import { userId } from '../user';

export const findUserPostsValidationSchema = z.object({
  userId,
  pagination: paginationValidationSchema,
});

export type FindUserPostsRequest = z.infer<
  typeof findUserPostsValidationSchema
>;

export class FindUserPostsBodyDto extends createZodDto(
  paginationValidationSchema,
) { }

export type FindUserPostsResponse = Post[];
