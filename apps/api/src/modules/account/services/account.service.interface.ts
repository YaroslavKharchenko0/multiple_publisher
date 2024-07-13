import { AccountStatus, ProviderKey } from "@app/types";
import { AccountModel } from "../models/account.model";

export interface CreateAccountParams {
  provider: ProviderKey;
  name: string;
  userId: number | null;
  status: AccountStatus;
}

export interface Service {
  createAccount(params: CreateAccountParams): Promise<AccountModel>
  findAccountById(id: number): Promise<AccountModel>
  updateAccountById(id: number, params: Partial<AccountModel>): Promise<AccountModel>
  deleteAccountById(id: number): Promise<AccountModel>
}
