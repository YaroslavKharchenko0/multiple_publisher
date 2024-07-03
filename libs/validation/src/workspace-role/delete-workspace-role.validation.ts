import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { workspaceRole } from './workspace-role.validation'

export const deleteWorkspaceRoleValidationSchema = z.object({
  role: workspaceRole,
})

export type DeleteWorkspaceRoleRequest = z.infer<typeof deleteWorkspaceRoleValidationSchema>

export class DeleteWorkspaceRoleDto extends createZodDto(deleteWorkspaceRoleValidationSchema) { }

export type DeleteWorkspaceRoleResponse = null;
