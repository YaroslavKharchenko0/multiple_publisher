import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { userId } from '../user';
import { Post, postDescription, postTitle, postType } from './post.validation';

export const updatePostPayloadValidationSchema = z.object({
  type: postType,
  title: postTitle,
  description: postDescription,
});

export const updatePostValidationSchema = z.object({
  userId,
  payload: updatePostPayloadValidationSchema,
});

export type UpdatePostRequest = z.infer<typeof updatePostValidationSchema>;

export class UpdatePostBodyDto extends createZodDto(
  updatePostPayloadValidationSchema,
) { }

export type UpdatePostResponse = Post;
