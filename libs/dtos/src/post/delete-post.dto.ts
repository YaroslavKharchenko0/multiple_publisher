import { deletePostValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeletePostBodyDto extends createZodDto(
  deletePostValidationSchema,
) { }
