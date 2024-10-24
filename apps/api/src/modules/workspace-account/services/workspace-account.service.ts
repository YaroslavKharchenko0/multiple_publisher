import { Injectable } from '@nestjs/common';
import { RmqErrorService } from '@app/errors';
import { PaginationMetadata } from '@app/validation';
import { WorkspaceAccountModel } from '../models/workspace-account.model';
import {
  WorkspaceAccountRepository,
  FindWorkspaceAccountsCountParams,
} from '../repositories/workspace-account.repository';
import {
  Service,
  CreateWorkspaceAccountParams,
  FindWorkspaceAccountsParams,
} from './workspace-account.service.interface';

@Injectable()
export class WorkspaceAccountService implements Service {
  constructor(
    private readonly repository: WorkspaceAccountRepository,
    private readonly rmqErrorService: RmqErrorService,
  ) { }
  async createWorkspaceAccount(
    params: CreateWorkspaceAccountParams,
  ): Promise<WorkspaceAccountModel> {
    const entities = await this.repository.createOne(params);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    const model = WorkspaceAccountModel.fromEntity(entity);

    return model;
  }
  async findWorkspaceAccounts(
    params: FindWorkspaceAccountsParams,
  ): Promise<WorkspaceAccountModel[]> {
    const entities = await this.repository.findMany({
      workspaceId: params.workspaceId,
      pagination: params.pagination,
    });

    const models = entities.map(WorkspaceAccountModel.fromEntity);

    return models;
  }
  async createWorkspaceAccountsPaginationMetadata(
    params: FindWorkspaceAccountsCountParams,
  ): Promise<PaginationMetadata> {
    const results = await this.repository.findCount(params);

    const [result] = results;

    const metadata: PaginationMetadata = {
      total: result?.count || 0,
    };

    return metadata;
  }
}
