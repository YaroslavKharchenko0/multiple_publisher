import { Pagination } from "@app/validation";
import { WorkspaceModel } from "../models/workspace.model";

export interface CreateWorkspaceParams {
  name: string;
  userId: number;
}

export interface Service {
  createWorkspaceByUser(userId: number): Promise<WorkspaceModel>;
  createWorkspace(input: CreateWorkspaceParams): Promise<WorkspaceModel>;
  deleteWorkspace(id: number): Promise<void>;
  findWorkspace(id: number): Promise<WorkspaceModel>;
  findUserWorkspaces(userId: number, pagination: Pagination): Promise<WorkspaceModel[]>;
}
