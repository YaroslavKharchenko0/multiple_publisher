import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { userId } from '../user';
import { Post, postDescription, postTitle, postType } from './post.validation';

export const createPostValidationSchema = z.object({
  userId,
  type: postType,
  title: postTitle,
  description: postDescription,
});

export type CreatePostRequest = z.infer<typeof createPostValidationSchema>;

export class CreatePostBodyDto extends createZodDto(
  createPostValidationSchema,
) { }

export type CreatePostResponse = Post;
