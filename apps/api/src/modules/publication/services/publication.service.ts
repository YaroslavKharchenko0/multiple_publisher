import { Injectable } from '@nestjs/common';
import {
  CreatePublicationParams,
  Service,
  UpdatePublicationParams,
} from './publication.service.interface';
import { Pagination } from '@app/validation';
import { PublicationModel } from '../models/publication.model';
import { PublicationRepository } from '../repositories/publication.repository';
import { RmqErrorService } from '@app/errors';
import { PublicationStatus } from '@app/types';

@Injectable()
export class PublicationService implements Service {
  constructor(
    private readonly repository: PublicationRepository,
    private readonly rmqErrorService: RmqErrorService,
  ) { }
  async createPublication(
    params: CreatePublicationParams,
  ): Promise<PublicationModel> {
    const defaultParams = {
      status: PublicationStatus.DRAFT,
    };

    const entities = await this.repository.createOne({
      ...defaultParams,
      ...params,
      title: '',
      description: '',
    });

    const [entity] = entities;

    if (!entity) {
      this.rmqErrorService.internalServerError();
    }

    return PublicationModel.fromEntity(entity);
  }
  async findPublicationById(id: number): Promise<PublicationModel> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      this.rmqErrorService.notFound();
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
  async updatePublicationById(
    id: number,
    params: UpdatePublicationParams,
  ): Promise<PublicationModel> {
    const entities = await this.repository.updateById(id, params);

    const [entity] = entities;

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }
  async deletePublicationById(id: number): Promise<PublicationModel> {
    const entities = await this.repository.deleteById(id);

    const [entity] = entities;

    if (!entity) {
      this.rmqErrorService.notFound();
    }

    return PublicationModel.fromEntity(entity);
  }
}
