import { deleteWorkspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class DeleteWorkspaceRoleDto extends createZodDto(deleteWorkspaceRoleValidationSchema) { }
