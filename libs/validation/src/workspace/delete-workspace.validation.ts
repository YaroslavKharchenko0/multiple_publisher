import { z } from 'zod'
import { workspaceId } from './workspace.validation'

export const deleteWorkspaceValidationSchema = z.object({
  id: workspaceId,
})

export type DeleteWorkspaceRequest = z.infer<typeof deleteWorkspaceValidationSchema>

export type DeleteWorkspaceResponse = null
