import { z } from 'zod';
import { Post, postId } from './post.validation';

export const findPostByIdValidationSchema = z.object({
  id: postId,
});

export type FindPostByIdRequest = z.infer<typeof findPostByIdValidationSchema>;

export type FindPostByIdResponse = Post;
