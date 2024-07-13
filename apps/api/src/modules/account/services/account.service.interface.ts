import { AccountStatus, ProviderKey } from "@app/types";
import { AccountModel } from "../models/account.model";

export interface CreateAccountParams {
  provider: ProviderKey;
  name: string;
  userId: string | null;
  status: AccountStatus.INACTIVE;
}

export interface Service {
  createAccount(params: CreateAccountParams): Promise<AccountModel>
  findAccountById(id: number): Promise<AccountModel>
  updateAccountById(id: number, params: Partial<CreateAccountParams>): Promise<AccountModel>
  deleteAccountById(id: number): Promise<AccountModel>
}
