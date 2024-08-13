import { Injectable } from '@nestjs/common';
import {
  CreatePublicationProviderParams,
  Service,
} from './publication-provider.service.interface';
import { PublicationProvider } from '@app/types';
import { Pagination } from '@app/validation';
import { PublicationProviderModel } from '../models/publication-provider.model';
import { PublicationProviderRepository } from '../repositories/publication-provider.repository';
import { RmqErrorService } from '@app/errors';

@Injectable()
export class PublicationProviderService implements Service {
  constructor(
    private readonly repository: PublicationProviderRepository,
    private readonly rmqErrorService: RmqErrorService,
  ) { }
  async findById(id: number): Promise<PublicationProviderModel> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationProviderModel.fromEntity(entity);
  }

  async createPublicationProvider(
    params: CreatePublicationProviderParams,
  ): Promise<PublicationProviderModel> {
    const entities = await this.repository.createOne({
      accountProviderId: params.accountProviderId,
      key: params.key,
    });

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.internalServerError();
    }

    return PublicationProviderModel.fromEntity(entity);
  }
  async findPublicationProvider(
    key: PublicationProvider,
  ): Promise<PublicationProviderModel> {
    const entity = await this.repository.findByKey(key);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationProviderModel.fromEntity(entity);
  }
  async findPublicationProviders(
    pagination: Pagination,
  ): Promise<PublicationProviderModel[]> {
    const entities = await this.repository.find(pagination);

    return entities.map(PublicationProviderModel.fromEntity);
  }
  async deletePublicationProvider(
    key: PublicationProvider,
  ): Promise<PublicationProviderModel> {
    const entities = await this.repository.deleteByKey(key);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return PublicationProviderModel.fromEntity(entity);
  }
  async findPublicationProvidersByAccountProvider(
    accountProviderId: number,
  ): Promise<PublicationProviderModel[]> {
    const entities =
      await this.repository.findByAccountProviderId(accountProviderId);

    return entities.map(PublicationProviderModel.fromEntity);
  }
}
