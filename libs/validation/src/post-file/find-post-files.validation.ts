import { z } from 'zod';
import { postId } from '../post/post.validation';
import { PostFile } from './post-file.validation';

export const findPostFilesValidationSchema = z.object({
  postId,
});

export type FindPostFilesRequest = z.infer<
  typeof findPostFilesValidationSchema
>;

export type FindPostFilesResponse = PostFile[];
