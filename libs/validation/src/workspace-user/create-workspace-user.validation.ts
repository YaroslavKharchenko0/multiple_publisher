import { z } from 'zod';
import { userId } from '../user';
import { workspaceId } from '../workspace';
import { workspaceRole } from '../workspace-role';
import { WorkspaceUser } from './workspace-user.validation';

export const createWorkspaceUserValidation = z.object({
  userId,
  workspaceId,
  role: workspaceRole,
});

export type CreateWorkspaceUserRequest = z.infer<
  typeof createWorkspaceUserValidation
>;

export const createWorkspaceUserBodyValidationSchema =
  createWorkspaceUserValidation.omit({ userId: true, workspaceId: true });

export type CreateWorkspaceUserResponse = WorkspaceUser;
