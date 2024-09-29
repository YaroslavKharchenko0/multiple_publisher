import { deletePostFilesValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeletePostFilesDto extends createZodDto(
  deletePostFilesValidationSchema,
) { }

