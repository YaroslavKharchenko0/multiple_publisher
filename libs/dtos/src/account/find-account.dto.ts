import { findAccountValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindAccountBodyDto extends createZodDto(
  findAccountValidationSchema,
) { }
