import { workspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class WorkspaceRoleDto extends createZodDto(workspaceRoleValidationSchema) { }
