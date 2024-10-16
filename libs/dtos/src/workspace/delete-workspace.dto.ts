import { deleteWorkspaceValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class DeleteWorkspaceBodyDto extends createZodDto(
  deleteWorkspaceValidationSchema,
) { }
