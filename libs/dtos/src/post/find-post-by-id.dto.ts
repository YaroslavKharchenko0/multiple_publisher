import { findPostByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPostByIdBodyDto extends createZodDto(
  findPostByIdValidationSchema,
) { }
