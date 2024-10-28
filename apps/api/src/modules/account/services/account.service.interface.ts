import { AccountStatus, ProviderKey } from '@app/types';
import { AccountModel } from '../models/account.model';

export interface CreateAccountParams {
  provider: ProviderKey;
  name: string;
  userId: number | null;
  status: AccountStatus;
}

export interface Options {
  traceId?: string;
}

export interface AccountTokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface OnSignInParams {
  internalId: string;
  accountTokens: AccountTokens;
  provider: ProviderKey;
  userId: number;
}

export interface Service {
  createAccount(
    params: CreateAccountParams,
    options?: Options,
  ): Promise<AccountModel>;
  findAccountById(id: number): Promise<AccountModel>;
  findAccountByInternalId(internalId: string): Promise<AccountModel | null>;
  updateAccountById(
    id: number,
    params: Partial<AccountModel>,
  ): Promise<AccountModel>;
  deleteAccountById(id: number): Promise<AccountModel>;
  onSignIn(params: OnSignInParams, options?: Options): Promise<void>;
}
