import { createWorkspaceAccountValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateWorkspaceAccountBodyDto extends createZodDto(
  createWorkspaceAccountValidationSchema.omit({ workspaceId: true }),
) { }
