import { z } from 'zod';
import { PaginationMetadata, paginationValidationSchema } from '../common';
import { WorkspaceAccount } from './workspace-account.validation';
import { workspaceId } from '../workspace/workspace.validation';

export const findWorkspaceAccountsValidationSchema = z.object({
  workspaceId,
  pagination: paginationValidationSchema,
});

export type FindWorkspaceAccountsRequest = z.infer<
  typeof findWorkspaceAccountsValidationSchema
>;

export type FindWorkspaceAccountsResponse = {
  workspaceAccounts: WorkspaceAccount[];
  metadata: PaginationMetadata;
};
