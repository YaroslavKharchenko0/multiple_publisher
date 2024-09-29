import { workspaceUserValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class WorkspaceUserDto extends createZodDto(
  workspaceUserValidationSchema,
) { }
