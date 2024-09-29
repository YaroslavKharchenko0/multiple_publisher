import { findAccountValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindAccountBodyDto extends createZodDto(
  findAccountValidationSchema,
) { }
