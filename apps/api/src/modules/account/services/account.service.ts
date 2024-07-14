import { Inject, Injectable } from '@nestjs/common';
import { AccountModel } from '../models/account.model';
import { AccountTokens, CreateAccountParams, Options, Service } from './account.service.interface';
import { AccountRepository } from '../repositories/account.repository';
import { ACCOUNT_REPOSITORY } from '../providers/account.providers';
import { RmqErrorService } from '@app/errors';
import { AccountFacade } from '@app/utils';
import { CreateAccountTokenCommand } from '@app/contracts';
import { AccountTokenType } from '@app/types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
@Injectable()
export class AccountService implements Service {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly repository: AccountRepository,
    private readonly rmqErrorService: RmqErrorService,
    private readonly accountFacade: AccountFacade,
    private readonly amqpConnection: AmqpConnection
  ) { }

  async findAccountByInternalId(internalId: string): Promise<AccountModel> {
    const entity = await this.repository.findAccountByInternalId(internalId);

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    return AccountModel.fromEntity(entity);
  }

  async createAccountTokens(account: AccountModel, accountTokens: AccountTokens | null, options?: Options) {
    const tokens = []

    if (accountTokens?.accessToken) {
      tokens.push({
        accountId: account.id,
        token: accountTokens.accessToken,
        type: AccountTokenType.ACCESS,
      })
    }

    if (accountTokens?.refreshToken) {
      tokens.push({
        accountId: account.id,
        token: accountTokens.refreshToken,
        type: AccountTokenType.REFRESH,
      })
    }

    const promises = tokens.map((payload) => {
      return this.amqpConnection.request<CreateAccountTokenCommand.Response>({
        exchange: CreateAccountTokenCommand.exchange,
        routingKey: CreateAccountTokenCommand.routingKey,
        payload,
        headers: {
          traceId: options?.traceId,
        }
      })
    });

    await Promise.all(promises);
  }

  async createAccount(params: CreateAccountParams, options?: Options): Promise<AccountModel> {
    const { provider, name, userId, status, internalId } = params;

    const accountProvider = await this.accountFacade.findByKey(provider, options?.traceId);

    if (!accountProvider) {
      throw this.rmqErrorService.badRequest();
    }

    const entities = await this.repository.createOne({
      providerId: accountProvider.id,
      name,
      userId,
      status,
      internalId
    });

    const [entity] = entities;

    if (!entity) {
      throw this.rmqErrorService.notFound();
    }

    const account = AccountModel.fromEntity(entity);

    return account;
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
