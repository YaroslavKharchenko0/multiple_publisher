import { createWorkspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class CreateWorkspaceRoleDto extends createZodDto(createWorkspaceRoleValidationSchema) { }

