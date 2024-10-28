import { deletePostFilesValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeletePostFilesDto extends createZodDto(
  deletePostFilesValidationSchema,
) { }

