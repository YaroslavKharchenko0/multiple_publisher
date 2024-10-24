import { z } from 'zod';
import { PaginationMetadata, paginationValidationSchema } from '../common';
import { WorkspacePost } from './workspace-post.validation';

export const findWorkspacePostsValidationSchema = z.object({
  workspaceId: z.string(),
  pagination: paginationValidationSchema,
});

export type FindWorkspacePostsRequest = z.infer<
  typeof findWorkspacePostsValidationSchema
>;

export type FindWorkspacePostsResponse = {
  workspacePosts: WorkspacePost[];
  metadata: PaginationMetadata;
};
