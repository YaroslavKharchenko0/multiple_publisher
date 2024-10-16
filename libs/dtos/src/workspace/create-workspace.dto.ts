import { createWorkspaceBodyValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class CreateWorkspaceBodyDto extends createZodDto(
  createWorkspaceBodyValidationSchema,
) { }
