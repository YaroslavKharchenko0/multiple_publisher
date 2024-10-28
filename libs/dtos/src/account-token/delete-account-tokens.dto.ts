import { deleteAccountTokensValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeleteAccountTokensBodyDto extends createZodDto(
  deleteAccountTokensValidationSchema,
) { }
