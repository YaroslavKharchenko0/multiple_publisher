import { deleteAccountProviderValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeleteAccountProviderBodyDto extends createZodDto(
  deleteAccountProviderValidationSchema,
) { }
