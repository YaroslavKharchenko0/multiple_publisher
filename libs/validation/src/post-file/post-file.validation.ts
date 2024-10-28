import { z } from 'zod';
import { postId } from '../post/post.validation';
import { fileId } from '../file';

export const postFileId = z.number().describe('Post file id');

export const postFileValidationSchema = z.object({
  id: postFileId,
  postId,
  fileId,
});

export type PostFile = z.infer<typeof postFileValidationSchema>;
