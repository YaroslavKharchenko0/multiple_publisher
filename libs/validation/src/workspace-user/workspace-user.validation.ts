import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
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

export class WorkspaceUserDto extends createZodDto(workspaceUserValidationSchema) { }
