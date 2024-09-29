import { z } from 'zod'
import { WorkspaceRole as BaseRole } from '@app/types'

export const workspaceRole = z.nativeEnum(BaseRole)

export const workspaceRoleId = z.number()

export const workspaceRoleValidationSchema = z.object({
  id: workspaceRoleId,
  role: workspaceRole,
})

export type WorkspaceRole = z.infer<typeof workspaceRoleValidationSchema>

