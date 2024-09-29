import { z } from 'zod'
import { WorkspaceRole, workspaceRole } from './workspace-role.validation'

export const findWorkspaceRoleValidationSchema = z.object({
  role: workspaceRole,
})

export type FindWorkspaceRoleRequest = z.infer<typeof findWorkspaceRoleValidationSchema>

export type FindWorkspaceRoleResponse = WorkspaceRole
