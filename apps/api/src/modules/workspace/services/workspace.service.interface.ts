import { WorkspaceModel } from "../models/workspace.model";

export interface CreateWorkspaceParams {
  name: string;
  userId: number;
}

export interface Options {
  traceId: string
}

export interface Service {
  createWorkspaceByUser(userId: number, options?: Options): Promise<WorkspaceModel>;
  createWorkspace(input: CreateWorkspaceParams, options?: Options): Promise<WorkspaceModel>;
  deleteWorkspace(id: number): Promise<void>;
  findWorkspace(id: number): Promise<WorkspaceModel>
}
