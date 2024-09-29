import { findFileByIdValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindFileByIdBodyDto extends createZodDto(
  findFileByIdValidationSchema,
) { }

