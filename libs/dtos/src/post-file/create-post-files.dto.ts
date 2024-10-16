import { createPostFilesValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreatePostFilesDto extends createZodDto(
  createPostFilesValidationSchema.omit({ postId: true }),
) { }
