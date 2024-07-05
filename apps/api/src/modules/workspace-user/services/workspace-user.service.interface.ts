import { Pagination } from "@app/validation";
import { WorkspaceUserModel } from "../models/workspace-user.model";
import { WorkspaceRole } from "@app/types";

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
  pagination: Pagination
}

export interface Service {
  createOneByRole(input: CreateOne): Promise<WorkspaceUserModel>;
  findOne(params: FindOneParams): Promise<WorkspaceUserModel>;
  updateOneByRole(params: UpdateOneParams, input: Partial<UpdateWorkspaceUserParams>): Promise<WorkspaceUserModel>;
  deleteOne(params: DeleteOneParams): Promise<WorkspaceUserModel>;
  findWorkspaceUsers(params: FindWorkspaceUsersParams): Promise<WorkspaceUserModel[]>;
}
