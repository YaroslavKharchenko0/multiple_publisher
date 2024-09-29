import { accountTokenValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class AccountTokenDto extends createZodDto(
  accountTokenValidationSchema,
) { }
