import { z } from 'zod';
import { userId } from '../user';
import { WorkspaceUser } from './workspace-user.validation';

export const findUserWorkspacesValidation = z.object({
  userId,
});

export type FindUserWorkspacesRequest = z.infer<
  typeof findUserWorkspacesValidation
>;

export type FindUserWorkspacesResponse = WorkspaceUser[];
