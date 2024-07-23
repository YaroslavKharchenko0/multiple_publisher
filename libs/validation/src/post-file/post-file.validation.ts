import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { postId } from '../post/post.validation';
import { fileId } from '../file';

export const postFileId = z.number();

export const postFileValidationSchema = z.object({
  id: postFileId,
  postId,
  fileId,
});

export type PostFile = z.infer<typeof postFileValidationSchema>;

export class PostFileDto extends createZodDto(postFileValidationSchema) { }
