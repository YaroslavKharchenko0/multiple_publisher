import { Inject, Injectable } from '@nestjs/common';
import { AccountModel } from '../models/account.model';
import {
  CreateAccountParams,
  OnSignInParams,
  Options,
  Service,
} from './account.service.interface';
import { AccountRepository } from '../repositories/account.repository';
import { ACCOUNT_REPOSITORY } from '../providers/account.providers';
import { RmqErrorService } from '@app/errors';
import { AccountFacade } from '@app/utils';
import { AccountStatus, ProviderKey } from '@app/types';
@Injectable()
export class AccountService implements Service {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) private readonly repository: AccountRepository,
    private readonly rmqErrorService: RmqErrorService,
    private readonly accountFacade: AccountFacade,
  ) { }

  async onSignIn(params: OnSignInParams, options?: Options): Promise<void> {
    const { internalId, accountTokens, provider, userId } = params;

    const account = await this.findAccountByInternalId(internalId);

    if (!account) {
      const createAccountParams: CreateAccountParams = {
        provider,
        userId,
        status: AccountStatus.INACTIVE,
        internalId,
        name: ProviderKey.GOOGLE,
      };

      const newAccount = await this.createAccount(createAccountParams, options);

      await this.accountFacade.createAccountTokens(
        newAccount.id,
        accountTokens,
        options,
      );

      return;
    }

    await this.accountFacade.deleteAccountTokens(account.id, options);

    await this.accountFacade.createAccountTokens(
      account.id,
      accountTokens,
      options,
    );
  }

  async findAccountByInternalId(
    internalId: string,
  ): Promise<AccountModel | null> {
    const entity = await this.repository.findAccountByInternalId(internalId);

    if (!entity) {
      return null;
    }

    return AccountModel.fromEntity(entity);
  }

  async createAccount(
    params: CreateAccountParams,
    options?: Options,
  ): Promise<AccountModel> {
    const { provider, name, userId, status, internalId } = params;

    const accountProvider = await this.accountFacade.findByKey(
      provider,
      options?.traceId,
    );

    if (!accountProvider) {
      throw this.rmqErrorService.badRequest();
    }

    const entities = await this.repository.createOne({
      providerId: accountProvider.id,
      name,
      userId,
      status,
      internalId,
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
