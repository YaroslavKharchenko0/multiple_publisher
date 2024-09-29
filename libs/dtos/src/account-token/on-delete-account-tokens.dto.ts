import { onDeleteAccountTokensValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class OnDeleteAccountTokensBodyDto extends createZodDto(
  onDeleteAccountTokensValidationSchema,
) { }
