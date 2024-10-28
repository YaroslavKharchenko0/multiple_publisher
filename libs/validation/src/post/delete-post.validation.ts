import { z } from 'zod';
import { postId } from './post.validation';

export const deletePostValidationSchema = z.object({
  id: postId,
});

export type DeletePostRequest = z.infer<typeof deletePostValidationSchema>;


export type DeletePostResponse = null;
