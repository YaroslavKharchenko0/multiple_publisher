import { ProviderKey } from "@app/types";
import { AccountProviderModel } from "../models/account-provider.model";

export interface CreateAccountProviderParams {
  key: ProviderKey;
}

export interface Service {
  createAccountProvider(params: CreateAccountProviderParams): Promise<AccountProviderModel>;
  findAccountProvider(key: ProviderKey): Promise<AccountProviderModel>;
  deleteAccountProvider(key: ProviderKey): Promise<AccountProviderModel>;
}
