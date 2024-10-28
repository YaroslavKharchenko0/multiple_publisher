import { findFileByIdValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindFileByIdBodyDto extends createZodDto(
  findFileByIdValidationSchema,
) { }

