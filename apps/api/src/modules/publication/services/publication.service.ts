import { Injectable } from '@nestjs/common';
import {
  CreatePublicationParams,
  Service,
  UpdatePublicationParams,
} from './publication.service.interface';
import { Pagination, PaginationMetadata } from '@app/validation';
import { PublicationModel } from '../models/publication.model';
import { PublicationRepository } from '../repositories/publication.repository';
import { RmqErrorService } from '@app/errors';
import { Options, PublicationStatus } from '@app/types';
import { PostFacade } from '@app/utils';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { OnCreatePublicationEvent } from '@app/contracts';

@Injectable()
export class PublicationService implements Service {
  constructor(
    private readonly repository: PublicationRepository,
    private readonly rmqErrorService: RmqErrorService,
    private readonly postFacade: PostFacade,
    private readonly amqpConnection: AmqpConnection,
  ) { }

  async updatePublicationById(
    id: number,
    params: UpdatePublicationParams,
  ): Promise<PublicationModel> {
    const entities = await this.repository.updateById(id, params);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }
  async createPublication(
    params: CreatePublicationParams,
    options?: Options,
  ): Promise<PublicationModel> {
    const defaultParams = {
      status: PublicationStatus.DRAFT,
    };

    const post = await this.postFacade.findPostById(
      params.postId,
      options?.traceId,
    );

    if (!post) {
      throw this.rmqErrorService.notFound();
    }

    const entities = await this.repository.createOne({
      ...defaultParams,
      ...params,
      title: params?.title || post.title,
      description: params?.description || post.description,
    });

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.internalServerError();
    }

    const model = PublicationModel.fromEntity(entity);

    await this.amqpConnection.publish<OnCreatePublicationEvent.Request>(
      OnCreatePublicationEvent.exchange,
      OnCreatePublicationEvent.routingKey,
      model,
    );

    return model;
  }
  async findPublicationById(id: number): Promise<PublicationModel> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }
  async findPublication(id: number, postId: number): Promise<PublicationModel> {
    const entity = await this.repository.findByIdAndPostId(id, postId);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }

  async findPostPublications(
    postId: number,
    pagination: Pagination,
  ): Promise<PublicationModel[]> {
    const entities = await this.repository.findPublicationsByPostId(
      postId,
      pagination,
    );

    return entities.map(PublicationModel.fromEntity);
  }

  async createPostPublicationsPaginationMetadata(
    postId: number,
  ): Promise<PaginationMetadata> {
    const results =
      await this.repository.createPostPublicationsPaginationMetadata(postId);

    const [result] = results;

    if (!result) {
      throw this.rmqErrorService.notFound();
    }

    const metadata: PaginationMetadata = {
      total: result.count,
    };

    return metadata;
  }
  async updatePublication(
    id: number,
    postId: number,
    params: UpdatePublicationParams,
  ): Promise<PublicationModel> {
    const entities = await this.repository.updateByIdAndPostId(
      id,
      postId,
      params,
    );

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }
  async deletePublication(
    id: number,
    postId: number,
  ): Promise<PublicationModel> {
    const entities = await this.repository.deleteByIdAndPostId(id, postId);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }
}
