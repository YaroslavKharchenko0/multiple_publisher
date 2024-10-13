import { Pagination, PaginationMetadata } from '@app/validation';
import { WorkspaceUserModel } from '../models/workspace-user.model';
import { WorkspaceRole } from '@app/types';
import { unique } from 'drizzle-orm/mysql-core';

export interface CreateOne {
  userId: number;
  workspaceId: number;
  role: WorkspaceRole;
}

export interface FindOneParams {
  userId: number;
  workspaceId: number;
}

export interface UpdateOneParams {
  userId: number;
  workspaceId: number;
}

export interface UpdateWorkspaceUserParams {
  role: WorkspaceRole;
}

export interface DeleteOneParams {
  userId: number;
  workspaceId: number;
}

export interface FindWorkspaceUsersParams {
  workspaceId: number;
  pagination: Pagination;
}

export interface Options {
  traceId?: string;
}

export interface FindUserWorkspaces {
  userId: number;
  pagination: Pagination;
}

export interface FindUserWorkspacePaginationMetadata {
  userId: number;
  unique: boolean;
}

export interface Service {
  createOneByRole(
    input: CreateOne,
    options: Options,
  ): Promise<WorkspaceUserModel>;
  findOne(params: FindOneParams): Promise<WorkspaceUserModel>;
  updateOneByRole(
    params: UpdateOneParams,
    input: Partial<UpdateWorkspaceUserParams>,
    options: Options,
  ): Promise<WorkspaceUserModel>;
  deleteOne(params: DeleteOneParams): Promise<WorkspaceUserModel>;
  findWorkspaceUsers(
    params: FindWorkspaceUsersParams,
  ): Promise<WorkspaceUserModel[]>;
  findUserWorkspaces(params: FindUserWorkspaces): Promise<WorkspaceUserModel[]>;
  findUserWorkspacePaginationMetadata(
    params: FindUserWorkspacePaginationMetadata,
  ): Promise<PaginationMetadata>;
}
