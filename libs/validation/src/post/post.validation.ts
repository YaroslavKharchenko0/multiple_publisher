import { z } from 'zod';
import { userId } from '../user';
import { PostType } from '@app/types';

export const postId = z.number();
export const postTitle = z.string().max(100);
export const postDescription = z.string().max(255);
export const postType = z.nativeEnum(PostType);

export const postValidationSchema = z.object({
  id: postId,
  title: postTitle,
  userId,
  description: postDescription,
  createdAt: z.date(),
  updatedAt: z.date(),
  type: postType,
});

export type Post = z.infer<typeof postValidationSchema>;
