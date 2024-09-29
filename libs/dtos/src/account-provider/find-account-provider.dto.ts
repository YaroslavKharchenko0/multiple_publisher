import { createZodDto } from 'nestjs-zod';
import { findAccountProviderValidationSchema } from '@app/validation';

export class FindAccountProviderBodyDto extends createZodDto(
  findAccountProviderValidationSchema,
) { }
