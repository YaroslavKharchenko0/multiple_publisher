import { findPostFilesValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindPostFilesDto extends createZodDto(
  findPostFilesValidationSchema,
) { }
