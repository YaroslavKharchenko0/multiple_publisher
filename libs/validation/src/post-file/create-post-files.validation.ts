import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
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

export class CreatePostFilesDto extends createZodDto(
  createPostFilesValidationSchema.omit({ postId: true }),
) { }

export type CreatePostFilesResponse = PostFile[];
