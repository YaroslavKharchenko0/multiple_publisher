import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { fileId } from '../file';
import { PostFile } from './post-file.validation';

export const createPostFilesValidationSchema = z.object({
  postId: z.string(),
  files: z.array(fileId),
});

export type CreatePostFilesRequest = z.infer<
  typeof createPostFilesValidationSchema
>;

export class CreatePostFilesDto extends createZodDto(
  createPostFilesValidationSchema,
) { }

export type CreatePostFilesResponse = PostFile[];
