import { z } from 'zod';
import { workspaceId } from '../workspace/workspace.validation';
import { postId } from '../post';
import { WorkspacePost } from './workspace-post.validation';

export const createWorkspacePostValidationSchema = z.object({
  workspaceId,
  postId,
});

export type CreateWorkspacePostRequest = z.infer<
  typeof createWorkspacePostValidationSchema
>;

export type CreateWorkspacePostResponse = WorkspacePost;
