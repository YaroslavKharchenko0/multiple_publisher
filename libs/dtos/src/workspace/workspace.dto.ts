import { workspaceValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class WorkspaceDto extends createZodDto(workspaceValidationSchema) { }
