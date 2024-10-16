import { accountProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class AccountProviderDto extends createZodDto(
  accountProviderValidationSchema,
) { }
