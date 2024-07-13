import { ProviderKey } from '@app/types';
import { AccountProviderModel } from '../models/account-provider.model';
import {
  CreateAccountProviderParams,
  Service,
} from './account-provider.service.interface';
import { Inject } from '@nestjs/common';
import { AccountProviderRepository } from '../repositories/account-provider.repostiory';
import { ACCOUNT_PROVIDER_REPOSITORY } from '../providers/account-provider.providers';
import { RmqErrorService } from '@app/errors';
import { Pagination } from '@app/validation';

export class AccountProviderService implements Service {
  constructor(
    @Inject(ACCOUNT_PROVIDER_REPOSITORY)
    private readonly repository: AccountProviderRepository,
    private readonly rmqErrorService: RmqErrorService,
  ) {}

  async findAccountProviders(
    pagination: Pagination,
  ): Promise<AccountProviderModel[]> {
    const entities = await this.repository.find(pagination);

    return entities.map(AccountProviderModel.fromEntity);
  }

  async createAccountProvider(
    params: CreateAccountProviderParams,
  ): Promise<AccountProviderModel> {
    const entities = await this.repository.createOne(params);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountProviderModel.fromEntity(entity);
  }
  async findAccountProvider(key: ProviderKey): Promise<AccountProviderModel> {
    const entity = await this.repository.findByKey(key);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountProviderModel.fromEntity(entity);
  }
  async deleteAccountProvider(key: ProviderKey): Promise<AccountProviderModel> {
    const entities = await this.repository.deleteByKey(key);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountProviderModel.fromEntity(entity);
  }
}
