import { findPostByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPostByIdBodyDto extends createZodDto(
  findPostByIdValidationSchema,
) { }
