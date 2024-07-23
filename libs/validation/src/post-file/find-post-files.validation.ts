import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { postId } from '../post/post.validation';
import { PostFile } from './post-file.validation';

export const findPostFilesValidationSchema = z.object({
  postId,
});

export type FindPostFilesRequest = z.infer<
  typeof findPostFilesValidationSchema
>;

export class FindPostFilesDto extends createZodDto(
  findPostFilesValidationSchema,
) { }

export type FindPostFilesResponse = PostFile[];
