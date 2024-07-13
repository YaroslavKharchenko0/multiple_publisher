import { AccountModel } from "../models/account.model";
import { CreateAccountParams, Service } from "./account.service.interface";

export class AccountService implements Service {
  createAccount(params: CreateAccountParams): Promise<AccountModel> {
    throw new Error("Method not implemented.");
  }
  findAccountById(id: number): Promise<AccountModel> {
    throw new Error("Method not implemented.");
  }
  updateAccountById(id: number, params: Partial<CreateAccountParams>): Promise<AccountModel> {
    throw new Error("Method not implemented.");
  }
  deleteAccountById(id: number): Promise<AccountModel> {
    throw new Error("Method not implemented.");
  }
}
