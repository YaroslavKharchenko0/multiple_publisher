import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { WorkspaceRole, workspaceRole } from './workspace-role.validation'

export const createWorkspaceRoleValidationSchema = z.object({
  role: workspaceRole,
})

export type CreateWorkspaceRoleRequest = z.infer<typeof createWorkspaceRoleValidationSchema>

export class CreateWorkspaceRoleDto extends createZodDto(createWorkspaceRoleValidationSchema) { }

export type CreateWorkspaceRoleResponse = WorkspaceRole
