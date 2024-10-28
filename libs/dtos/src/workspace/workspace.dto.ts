import { workspaceValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class WorkspaceDto extends createZodDto(workspaceValidationSchema) { }
