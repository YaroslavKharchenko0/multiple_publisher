import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { postId } from './post.validation';

export const deletePostValidationSchema = z.object({
  id: postId,
});

export type DeletePostRequest = z.infer<typeof deletePostValidationSchema>;

export class DeletePostBodyDto extends createZodDto(
  deletePostValidationSchema,
) { }

export type DeletePostResponse = null;
