import { AccountStatus } from '@app/types';

export class AccountModel {
  id: number;
  providerId: number;
  internalId: string;
  name: string;
  userId: number | null;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;

  setFields(input: Partial<AccountModel>) {
    this.id = input.id ?? this.id;
    this.providerId = input.providerId ?? this.providerId;
    this.name = input.name ?? this.name;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.userId = input.userId ?? this.userId;
    this.status = input.status ?? this.status;
    this.updatedAt = input.updatedAt ?? this.updatedAt;
    this.internalId = input.internalId ?? this.internalId;

    return this;
  }

  static fromEntity(input: Partial<AccountModel>) {
    const entity = new AccountModel().setFields(input);

    return entity;
  }
}
