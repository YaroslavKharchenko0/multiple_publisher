import { createWorkspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class CreateWorkspaceRoleDto extends createZodDto(createWorkspaceRoleValidationSchema) { }

