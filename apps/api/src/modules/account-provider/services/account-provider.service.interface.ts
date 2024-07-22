import { ProviderKey } from '@app/types';
import { AccountProviderModel } from '../models/account-provider.model';
import { Pagination } from '@app/validation';

export interface CreateAccountProviderParams {
  key: ProviderKey;
}

export interface Service {
  createAccountProvider(
    params: CreateAccountProviderParams,
  ): Promise<AccountProviderModel>;
  findAccountProvider(key: ProviderKey): Promise<AccountProviderModel>;
  findAccountProviders(pagination: Pagination): Promise<AccountProviderModel[]>;
  deleteAccountProvider(key: ProviderKey): Promise<AccountProviderModel>;
}
