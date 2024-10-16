import { deletePostValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeletePostBodyDto extends createZodDto(
  deletePostValidationSchema,
) { }
