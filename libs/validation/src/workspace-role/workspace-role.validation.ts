import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { WorkspaceRole as BaseRole } from '@app/types'

export const workspaceRole = z.nativeEnum(BaseRole)

export const workspaceRoleId = z.number()

export const workspaceRoleValidationSchema = z.object({
  id: workspaceRoleId,
  role: workspaceRole,
})

export type WorkspaceRole = z.infer<typeof workspaceRoleValidationSchema>

export class WorkspaceRoleDto extends createZodDto(workspaceRoleValidationSchema) { }
