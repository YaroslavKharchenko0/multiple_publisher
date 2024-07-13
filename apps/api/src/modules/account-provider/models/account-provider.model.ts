import { ProviderKey } from "@app/types";

export class AccountProviderModel {
  id: number;
  key: ProviderKey;

  setFields(input: Partial<AccountProviderModel>) {
    this.id = input.id ?? this.id;
    this.key = input.key ?? this.key;

    return this;
  }

  static fromEntity(input: Partial<AccountProviderModel>) {
    const entity = new AccountProviderModel().setFields(input);

    return entity;
  }
}
