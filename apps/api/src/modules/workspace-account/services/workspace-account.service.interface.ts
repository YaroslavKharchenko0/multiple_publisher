import { Pagination, PaginationMetadata } from '@app/validation';
import { WorkspaceAccountModel } from '../models/workspace-account.model';

export interface CreateWorkspaceAccountParams {
  workspaceId: number;
  accountId: number;
}

export interface FindWorkspaceAccountsParams {
  workspaceId: number;
  pagination: Pagination;
}

export interface FindWorkspaceAccountsCountParams {
  workspaceId: number;
}

export interface Service {
  createWorkspaceAccount(
    params: CreateWorkspaceAccountParams,
  ): Promise<WorkspaceAccountModel>;
  findWorkspaceAccounts(
    params: FindWorkspaceAccountsParams,
  ): Promise<WorkspaceAccountModel[]>;
  createWorkspaceAccountsPaginationMetadata(
    params: FindWorkspaceAccountsCountParams,
  ): Promise<PaginationMetadata>;
}
