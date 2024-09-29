import { createZodDto } from 'nestjs-zod';
import { deleteAccountValidationSchema } from '@app/validation';

export class DeleteAccountBodyDto extends createZodDto(
  deleteAccountValidationSchema,
) { }
