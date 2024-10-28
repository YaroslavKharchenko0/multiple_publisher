import { createAccountProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateAccountProviderBodyDto extends createZodDto(
  createAccountProviderValidationSchema,
) { }
