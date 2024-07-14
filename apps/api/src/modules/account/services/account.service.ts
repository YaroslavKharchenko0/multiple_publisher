import { Inject, Injectable } from '@nestjs/common';
import { AccountModel } from '../models/account.model';
import { CreateAccountParams, Service } from './account.service.interface';
import { AccountRepository } from '../repositories/account.repository';
import { ACCOUNT_REPOSITORY } from '../providers/account.providers';
import { RmqErrorService } from '@app/errors';
import { AccountFacade } from '@app/utils';
@Injectable()
export class AccountService implements Service {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly repository: AccountRepository,
    private readonly rmqErrorService: RmqErrorService,
    private readonly accountFacade: AccountFacade,
  ) {}

  async createAccount(params: CreateAccountParams): Promise<AccountModel> {
    const { provider, name, userId, status } = params;

    const accountProvider = await this.accountFacade.findByKey(provider);

    if (!accountProvider) {
      throw this.rmqErrorService.badRequest();
    }

    const entities = await this.repository.createOne({
      providerId: accountProvider.id,
      name,
      userId,
      status,
    });

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountModel.fromEntity(entity);
  }
  async findAccountById(id: number): Promise<AccountModel> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountModel.fromEntity(entity);
  }
  async updateAccountById(
    id: number,
    params: Partial<AccountModel>,
  ): Promise<AccountModel> {
    const entities = await this.repository.updateById(id, params);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountModel.fromEntity(entity);
  }
  async deleteAccountById(id: number): Promise<AccountModel> {
    const entities = await this.repository.deleteById(id);

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountModel.fromEntity(entity);
  }
}
