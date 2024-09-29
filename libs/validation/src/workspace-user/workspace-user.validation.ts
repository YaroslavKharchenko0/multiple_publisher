import { z } from 'zod'
import { userId } from '../user'
import { workspaceId } from '../workspace'
import { workspaceRoleId } from '../workspace-role'

export const workspaceUserId = z.number()

export const workspaceUserValidationSchema = z.object({
  id: workspaceUserId,
  userId,
  workspaceId,
  roleId: workspaceRoleId,
  joinedAt: z.date(),
})

export type WorkspaceUser = z.infer<typeof workspaceUserValidationSchema>

