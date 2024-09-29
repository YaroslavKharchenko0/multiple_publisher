import { z } from 'zod';
import { userId } from '../user';

export const workspaceId = z.number().describe('Workspace id');
export const workspaceName = z.string().max(100).describe('Workspace name');

export const workspaceValidationSchema = z.object({
  id: workspaceId,
  userId,
  name: workspaceName,
  createdAt: z.date(),
});

export type Workspace = z.infer<typeof workspaceValidationSchema>;
