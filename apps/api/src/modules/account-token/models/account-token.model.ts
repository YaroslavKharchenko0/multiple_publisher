import { AccountTokenType } from '@app/types';

export class AccountTokenModel {
  id: number;
  accountId: number;
  token: string;
  type: AccountTokenType;
  createdAt: Date;

  setFields(input: Partial<AccountTokenModel>) {
    this.id = input.id ?? this.id;
    this.accountId = input.accountId ?? this.accountId;
    this.token = input.token ?? this.token;
    this.type = input.type ?? this.type;
    this.createdAt = input.createdAt ?? this.createdAt;

    return this;
  }

  static fromEntity(input: Partial<AccountTokenModel>) {
    const entity = new AccountTokenModel().setFields(input);

    return entity;
  }
}
