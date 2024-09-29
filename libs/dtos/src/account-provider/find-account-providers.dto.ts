import { findAccountProvidersValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class FindAccountProvidersBodyDto extends createZodDto(
  findAccountProvidersValidationSchema,
) { }
