import { deleteAccountProviderValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeleteAccountProviderBodyDto extends createZodDto(
  deleteAccountProviderValidationSchema,
) { }
