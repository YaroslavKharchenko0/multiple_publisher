import { PublicationProvider } from '@app/types';

export class PublicationProviderModel {
  id: number;
  key: PublicationProvider;
  accountProviderId: number;

  setFields(input: Partial<PublicationProviderModel>) {
    this.id = input.id ?? this.id;
    this.key = input.key ?? this.key;
    this.accountProviderId = input.accountProviderId ?? this.accountProviderId;

    return this;
  }

  static fromEntity(input: Partial<PublicationProviderModel>) {
    const entity = new PublicationProviderModel().setFields(input);

    return entity;
  }
}
