import { z } from 'zod'
import { WorkspaceRole as BaseRole } from '@app/types'

export const workspaceRole = z.nativeEnum(BaseRole).describe('Workspace role')

export const workspaceRoleId = z.number().describe('Workspace role id')

export const workspaceRoleValidationSchema = z.object({
  id: workspaceRoleId,
  role: workspaceRole,
})

export type WorkspaceRole = z.infer<typeof workspaceRoleValidationSchema>

