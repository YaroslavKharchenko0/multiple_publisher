import { z } from 'zod'
import { workspaceRole } from './workspace-role.validation'

export const deleteWorkspaceRoleValidationSchema = z.object({
  role: workspaceRole,
})

export type DeleteWorkspaceRoleRequest = z.infer<typeof deleteWorkspaceRoleValidationSchema>

export type DeleteWorkspaceRoleResponse = null;
