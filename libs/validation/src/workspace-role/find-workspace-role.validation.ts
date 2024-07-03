import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { WorkspaceRole, workspaceRole } from './workspace-role.validation'

export const findWorkspaceRoleValidationSchema = z.object({
  role: workspaceRole,
})

export type FindWorkspaceRoleRequest = z.infer<typeof findWorkspaceRoleValidationSchema>

export class FindWorkspaceRoleDto extends createZodDto(findWorkspaceRoleValidationSchema) { }

export type FindWorkspaceRoleResponse = WorkspaceRole
