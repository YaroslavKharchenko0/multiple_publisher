import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
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

export class UpdatePostBodyDto extends createZodDto(
  updatePostPayloadValidationSchema,
) { }

export type UpdatePostResponse = Post;
