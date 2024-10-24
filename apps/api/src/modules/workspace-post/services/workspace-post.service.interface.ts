import { Pagination, PaginationMetadata } from '@app/validation';
import { WorkspacePostModel } from '../models/workspace-post.model';

export interface CreateWorkspacePostParams {
  workspaceId: number;
  postId: number;
}

export interface FindWorkspacePostsParams {
  workspaceId: number;
  pagination: Pagination;
}

export interface FindWorkspacePostsCountParams {
  workspaceId: number;
}

export interface Service {
  createWorkspacePost(
    params: CreateWorkspacePostParams,
  ): Promise<WorkspacePostModel>;
  findWorkspacePosts(
    params: FindWorkspacePostsParams,
  ): Promise<WorkspacePostModel[]>;
  createWorkspacePostsPaginationMetadata(
    params: FindWorkspacePostsCountParams,
  ): Promise<PaginationMetadata>;
}
