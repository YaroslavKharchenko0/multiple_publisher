import { z } from 'zod';
import {
  Post,
  postDescription,
  postId,
  postTitle,
  postType,
} from './post.validation';

export const updatePostPayloadValidationSchema = z.object({
  type: postType,
  title: postTitle,
  description: postDescription,
});

export const updatePostValidationSchema = z.object({
  postId,
  payload: updatePostPayloadValidationSchema,
});

export type UpdatePostRequest = z.infer<typeof updatePostValidationSchema>;

export type UpdatePostResponse = Post;
