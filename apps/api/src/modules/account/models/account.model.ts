import { AccountStatus } from "@app/types";

export class AccountModel {
  id: number;
  providerId: number;
  createdAt: Date;
  name: string | null;
  userId: number | null;
  status: AccountStatus;

  setFields(input: Partial<AccountModel>) {
    this.id = input.id ?? this.id;
    this.providerId = input.providerId ?? this.providerId;
    this.name = input.name ?? this.name;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.userId = input.userId ?? this.userId;
    this.status = input.status ?? this.status;

    return this;
  }

  static fromEntity(input: Partial<AccountModel>) {
    const entity = new AccountModel().setFields(input);

    return entity;
  }
}
