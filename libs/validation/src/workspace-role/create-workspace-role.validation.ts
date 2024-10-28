import { z } from 'zod';
import { WorkspaceRole, workspaceRole } from './workspace-role.validation';

export const createWorkspaceRoleValidationSchema = z.object({
  role: workspaceRole,
});

export type CreateWorkspaceRoleRequest = z.infer<
  typeof createWorkspaceRoleValidationSchema
>;

export type CreateWorkspaceRoleResponse = WorkspaceRole;
