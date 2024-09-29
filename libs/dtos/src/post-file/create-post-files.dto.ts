import { createPostFilesValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreatePostFilesDto extends createZodDto(
  createPostFilesValidationSchema.omit({ postId: true }),
) { }
