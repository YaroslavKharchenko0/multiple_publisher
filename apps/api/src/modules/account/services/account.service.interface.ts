import { AccountModel } from "../models/account.model";

export interface Service {
  createAccount(): Promise<AccountModel>
}
