import { z } from 'zod';
import { Workspace, workspaceName } from './workspace.validation';
import { userId } from '../user';

export const createWorkspaceValidationSchema = z.object({
  name: workspaceName,
  userId,
});

export type CreateWorkspaceRequest = z.infer<
  typeof createWorkspaceValidationSchema
>;

export const createWorkspaceBodyValidationSchema =
  createWorkspaceValidationSchema.omit({ userId: true });

export type CreateWorkspaceResponse = Workspace;
