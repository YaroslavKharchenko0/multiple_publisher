import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { Post, postId } from './post.validation';

export const findPostByIdValidationSchema = z.object({
  id: postId,
});

export type FindPostByIdRequest = z.infer<typeof findPostByIdValidationSchema>;

export class FindPostByIdBodyDto extends createZodDto(
  findPostByIdValidationSchema,
) { }

export type FindPostByIdResponse = Post;
