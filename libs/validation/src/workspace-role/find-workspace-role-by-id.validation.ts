import { z } from 'zod'
import { WorkspaceRole, workspaceRoleId } from './workspace-role.validation'

export const findWorkspaceRoleByIdValidationSchema = z.object({
  id: workspaceRoleId
})

export type FindWorkspaceRoleByIdRequest = z.infer<typeof findWorkspaceRoleByIdValidationSchema>

export type FindWorkspaceRoleByIdResponse = WorkspaceRole
