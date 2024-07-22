import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { Post } from './post.validation';
import { paginationValidationSchema } from '../common';

export const findPostsValidationSchema = z.object({
  pagination: paginationValidationSchema,
});

export type FindPostsRequest = z.infer<typeof findPostsValidationSchema>;

export class FindPostsBodyDto extends createZodDto(
  paginationValidationSchema,
) { }

export type FindPostsResponse = Post[];
