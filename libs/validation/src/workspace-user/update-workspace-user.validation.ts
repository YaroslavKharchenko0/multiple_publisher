import { z } from 'zod'
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

export const updateWorkspaceUserBodyValidationSchema = updateWorkspaceUserValidation.omit({ userId: true, workspaceId: true })

export type UpdateWorkspaceUserResponse = WorkspaceUser
