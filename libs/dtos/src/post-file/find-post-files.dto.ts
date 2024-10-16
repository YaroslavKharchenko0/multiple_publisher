import { findPostFilesValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindPostFilesDto extends createZodDto(
  findPostFilesValidationSchema,
) { }
