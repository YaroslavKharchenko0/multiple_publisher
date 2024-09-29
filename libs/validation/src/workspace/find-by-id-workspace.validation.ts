import { z } from 'zod'
import { Workspace, workspaceId } from './workspace.validation'

export const findByIdWorkspaceValidationSchema = z.object({
  id: workspaceId,
})

export type FindByIdWorkspaceRequest = z.infer<typeof findByIdWorkspaceValidationSchema>

export type FindByIdWorkspaceResponse = Workspace
