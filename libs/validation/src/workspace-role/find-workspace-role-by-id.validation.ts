import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { WorkspaceRole, workspaceRoleId } from './workspace-role.validation'

export const findWorkspaceRoleByIdValidationSchema = z.object({
  id: workspaceRoleId
})

export type FindWorkspaceRoleByIdRequest = z.infer<typeof findWorkspaceRoleByIdValidationSchema>

export class FindWorkspaceRoleByIdDto extends createZodDto(findWorkspaceRoleByIdValidationSchema) { }

export type FindWorkspaceRoleByIdResponse = WorkspaceRole
