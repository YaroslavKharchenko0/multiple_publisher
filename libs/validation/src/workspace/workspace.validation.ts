import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { userId } from '../user'

export const workspaceId = z.number()
export const workspaceName = z.string().max(100)

const workspaceValidationSchema = z.object({
  id: workspaceId,
  userId,
  name: workspaceName,
  createdAt: z.date(),
})

export type Workspace = z.infer<typeof workspaceValidationSchema>

export class WorkspaceDto extends createZodDto(workspaceValidationSchema) { }
