import { z } from 'zod';
import { PaginationMetadata, paginationValidationSchema } from '../common';
import { WorkspacePost } from './workspace-post.validation';
import { workspaceId } from '../workspace/workspace.validation';

export const findWorkspacePostsValidationSchema = z.object({
  workspaceId,
  pagination: paginationValidationSchema,
});

export type FindWorkspacePostsRequest = z.infer<
  typeof findWorkspacePostsValidationSchema
>;

export type FindWorkspacePostsResponse = {
  workspacePosts: WorkspacePost[];
  metadata: PaginationMetadata;
};
