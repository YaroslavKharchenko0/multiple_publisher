import { createPostBodyValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreatePostBodyDto extends createZodDto(
  createPostBodyValidationSchema,
) { }
