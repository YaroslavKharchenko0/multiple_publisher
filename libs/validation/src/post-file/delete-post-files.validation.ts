import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { postId } from '../post/post.validation';
import { PostFile } from './post-file.validation';

export const deletePostFilesValidationSchema = z.object({
  postId,
});

export type DeletePostFilesRequest = z.infer<
  typeof deletePostFilesValidationSchema
>;

export class DeletePostFilesDto extends createZodDto(
  deletePostFilesValidationSchema,
) { }

export type DeletePostFilesResponse = PostFile[];
