import { deleteWorkspaceValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class DeleteWorkspaceBodyDto extends createZodDto(
  deleteWorkspaceValidationSchema,
) { }
