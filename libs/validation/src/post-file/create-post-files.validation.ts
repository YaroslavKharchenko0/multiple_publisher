import { z } from 'zod';
import { fileId } from '../file';
import { PostFile } from './post-file.validation';
import { postId } from '../post/post.validation';

export const createPostFilesValidationSchema = z.object({
  postId,
  files: z.array(fileId),
});

export type CreatePostFilesRequest = z.infer<
  typeof createPostFilesValidationSchema
>;

export type CreatePostFilesResponse = PostFile[];
