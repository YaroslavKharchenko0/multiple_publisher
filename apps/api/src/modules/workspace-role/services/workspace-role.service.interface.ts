import { WorkspaceRole } from "@app/types"
import { WorkspaceRoleModel } from "../models/workspace-role.model";

export interface CreateWorkspaceRoleParams {
  role: WorkspaceRole;
}

export interface Service {
  createWorkspaceRole(input: CreateWorkspaceRoleParams): Promise<WorkspaceRoleModel>
  findWorkspaceRole(role: WorkspaceRole): Promise<WorkspaceRoleModel>
  deleteWorkspaceRole(role: WorkspaceRole): Promise<void>
}
