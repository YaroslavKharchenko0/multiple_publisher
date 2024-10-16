import { createZodDto } from '@anatine/zod-nestjs';
import { findAccountProviderValidationSchema } from '@app/validation';

export class FindAccountProviderBodyDto extends createZodDto(
  findAccountProviderValidationSchema,
) { }
