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

export const createPostBodyValidationSchema = createPostValidationSchema.omit({
  userId: true,
});

export class CreatePostBodyDto extends createZodDto(
  createPostBodyValidationSchema,
) { }

export type CreatePostResponse = Post;
