import { AccountTokenType } from '@app/types';
import { AccountTokenModel } from '../models/account-token.model';

export interface CreateTokenParams {
  accountId: number;
  token: string;
  type: AccountTokenType;
}

export interface Service {
  createToken(params: CreateTokenParams): Promise<AccountTokenModel>;
  deleteTokens(accountId: number): Promise<AccountTokenModel[]>;
  getTokens(accountId: number): Promise<AccountTokenModel[]>;
}
