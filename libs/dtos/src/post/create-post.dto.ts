import { createPostBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreatePostBodyDto extends createZodDto(
  createPostBodyValidationSchema,
) { }
