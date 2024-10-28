import { createZodDto } from '@anatine/zod-nestjs';
import { deleteAccountValidationSchema } from '@app/validation';

export class DeleteAccountBodyDto extends createZodDto(
  deleteAccountValidationSchema,
) { }
