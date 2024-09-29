import { z } from 'zod';
import { postId } from '../post/post.validation';
import { PostFile } from './post-file.validation';

export const deletePostFilesValidationSchema = z.object({
  postId,
});

export type DeletePostFilesRequest = z.infer<
  typeof deletePostFilesValidationSchema
>;

export type DeletePostFilesResponse = PostFile[];
