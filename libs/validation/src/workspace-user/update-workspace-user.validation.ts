import { z } from 'nestjs-zod/z'
import { createZodDto } from 'nestjs-zod'
import { userId } from "../user";
import { workspaceId } from "../workspace";
import { workspaceRole } from "../workspace-role";
import { WorkspaceUser } from './workspace-user.validation';

export const updateWorkspaceUserValidation = z.object({
  userId,
  workspaceId,
  role: workspaceRole,
})

export type UpdateWorkspaceUserRequest = z.infer<typeof updateWorkspaceUserValidation>

export class UpdateWorkspaceUserDto extends createZodDto(updateWorkspaceUserValidation) { }

export type UpdateWorkspaceUserResponse = WorkspaceUser
