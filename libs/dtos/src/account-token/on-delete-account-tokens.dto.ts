import { onDeleteAccountTokensValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class OnDeleteAccountTokensBodyDto extends createZodDto(
  onDeleteAccountTokensValidationSchema,
) { }
