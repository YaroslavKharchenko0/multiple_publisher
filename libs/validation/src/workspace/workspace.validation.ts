import { z } from 'zod';
import { userId } from '../user';

export const workspaceId = z.number();
export const workspaceName = z.string().max(100);

export const workspaceValidationSchema = z.object({
  id: workspaceId,
  userId,
  name: workspaceName,
  createdAt: z.date(),
});

export type Workspace = z.infer<typeof workspaceValidationSchema>;
