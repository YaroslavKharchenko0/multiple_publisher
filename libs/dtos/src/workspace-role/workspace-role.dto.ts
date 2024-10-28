import { workspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class WorkspaceRoleDto extends createZodDto(workspaceRoleValidationSchema) { }
