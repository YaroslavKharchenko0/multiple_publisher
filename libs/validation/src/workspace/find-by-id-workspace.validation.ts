import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { Workspace, workspaceId } from './workspace.validation'

export const findByIdWorkspaceValidationSchema = z.object({
  id: workspaceId,
})

export type FindByIdWorkspaceRequest = z.infer<typeof findByIdWorkspaceValidationSchema>

export class FindByIdWorkspaceBodyDto extends createZodDto(findByIdWorkspaceValidationSchema) { }

export type FindByIdWorkspaceResponse = Workspace
