import { z } from 'zod';
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

export type CreatePostResponse = Post;
