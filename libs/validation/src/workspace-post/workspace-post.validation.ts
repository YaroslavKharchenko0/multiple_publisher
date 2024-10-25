import { z } from 'zod';
import { workspaceId } from '../workspace/workspace.validation';
import { postId } from '../post';

export const workspacePostId = z.number().int().positive();

export const workspacePostValidationSchema = z.object({
  id: workspacePostId,
  workspaceId,
  postId,
});

export type WorkspacePost = z.infer<typeof workspacePostValidationSchema>;
