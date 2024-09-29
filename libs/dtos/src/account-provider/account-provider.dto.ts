import { accountProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class AccountProviderDto extends createZodDto(
  accountProviderValidationSchema,
) { }
