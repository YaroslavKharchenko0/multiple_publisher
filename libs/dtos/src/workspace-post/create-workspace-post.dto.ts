import { createWorkspacePostValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateWorkspacePostBodyDto extends createZodDto(
  createWorkspacePostValidationSchema.omit({ workspaceId: true }),
) { }
