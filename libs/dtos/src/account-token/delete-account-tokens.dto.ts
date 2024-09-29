import { deleteAccountTokensValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeleteAccountTokensBodyDto extends createZodDto(
  deleteAccountTokensValidationSchema,
) { }
