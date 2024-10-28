import { Injectable } from '@nestjs/common';
import { WorkspacePostRepository } from '../repositories/workspace-post.repository';
import {
  CreateWorkspacePostParams,
  FindWorkspacePostsCountParams,
  FindWorkspacePostsParams,
  Service,
} from './workspace-post.service.interface';
import { WorkspacePostModel } from '../models/workspace-post.model';
import { RmqErrorService } from '@app/errors';
import { PaginationMetadata } from '@app/validation';

@Injectable()
export class WorkspacePostService implements Service {
  constructor(
    private readonly repository: WorkspacePostRepository,
    private readonly rmqErrorService: RmqErrorService,
  ) { }
  async createWorkspacePost(
    params: CreateWorkspacePostParams,
  ): Promise<WorkspacePostModel> {
    const entities = await this.repository.createOne(params);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    const model = WorkspacePostModel.fromEntity(entity);

    return model;
  }
  async findWorkspacePosts(
    params: FindWorkspacePostsParams,
  ): Promise<WorkspacePostModel[]> {
    const entities = await this.repository.findMany({
      workspaceId: params.workspaceId,
      pagination: params.pagination,
    });

    const models = entities.map(WorkspacePostModel.fromEntity);

    return models;
  }
  async createWorkspacePostsPaginationMetadata(
    params: FindWorkspacePostsCountParams,
  ): Promise<PaginationMetadata> {
    const results = await this.repository.findCount(params);

    const [result] = results;

    const metadata: PaginationMetadata = {
      total: result?.count || 0,
    };

    return metadata;
  }
}
