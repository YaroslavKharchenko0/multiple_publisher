import { Pagination } from "@app/validation";
import { WorkspaceUserModel } from "../models/workspace-user.model";

export interface CreateOne {
  userId: number;
  workspaceId: number;
  roleId: number;
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
  roleId: number;
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
  createOne(input: CreateOne): Promise<WorkspaceUserModel>;
  findOne(params: FindOneParams): Promise<WorkspaceUserModel>;
  updateOne(params: UpdateOneParams, input: Partial<UpdateWorkspaceUserParams>): Promise<WorkspaceUserModel>;
  deleteOne(params: DeleteOneParams): Promise<WorkspaceUserModel>;
  findWorkspaceUsers(params: FindWorkspaceUsersParams): Promise<WorkspaceUserModel[]>;
}
