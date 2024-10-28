import { getAccountTokensValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class GetAccountTokensBodyDto extends createZodDto(
  getAccountTokensValidationSchema,
) { }
