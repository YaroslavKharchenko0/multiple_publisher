import { accountTokenValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class AccountTokenDto extends createZodDto(
  accountTokenValidationSchema,
) { }
