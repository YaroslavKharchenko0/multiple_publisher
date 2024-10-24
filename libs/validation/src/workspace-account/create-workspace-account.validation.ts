import { z } from 'zod';
import { workspaceId } from '../workspace/workspace.validation';
import { accountId } from '../account';
import { WorkspaceAccount } from './workspace-account.validation';

export const createWorkspaceAccountValidationSchema = z.object({
  workspaceId,
  accountId,
});

export type CreateWorkspaceAccountRequest = z.infer<
  typeof createWorkspaceAccountValidationSchema
>;

export type CreateWorkspaceAccountResponse = WorkspaceAccount;
