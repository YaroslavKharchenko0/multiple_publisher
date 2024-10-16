import { findAccountProvidersValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class FindAccountProvidersBodyDto extends createZodDto(
  findAccountProvidersValidationSchema,
) { }
