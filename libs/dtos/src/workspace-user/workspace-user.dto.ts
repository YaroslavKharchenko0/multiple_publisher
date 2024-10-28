import { workspaceUserValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class WorkspaceUserDto extends createZodDto(
  workspaceUserValidationSchema,
) { }
