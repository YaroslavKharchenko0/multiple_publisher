import { getAccountTokensValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class GetAccountTokensBodyDto extends createZodDto(
  getAccountTokensValidationSchema,
) { }
