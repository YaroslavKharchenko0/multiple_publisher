import { createAccountProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreateAccountProviderBodyDto extends createZodDto(
  createAccountProviderValidationSchema,
) { }
