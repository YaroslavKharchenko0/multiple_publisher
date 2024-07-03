import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { workspaceId } from './workspace.validation'

export const deleteWorkspaceValidationSchema = z.object({
  id: workspaceId,
})

export type DeleteWorkspaceRequest = z.infer<typeof deleteWorkspaceValidationSchema>

export class DeleteWorkspaceBodyDto extends createZodDto(deleteWorkspaceValidationSchema) { }

export type DeleteWorkspaceResponse = null
