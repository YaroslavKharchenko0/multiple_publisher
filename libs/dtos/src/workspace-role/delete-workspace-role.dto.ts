import { deleteWorkspaceRoleValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class DeleteWorkspaceRoleDto extends createZodDto(deleteWorkspaceRoleValidationSchema) { }
