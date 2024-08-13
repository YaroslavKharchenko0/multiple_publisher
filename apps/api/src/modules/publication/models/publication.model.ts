import { PublicationStatus } from '@app/types';

export class PublicationModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  postId: number;
  status: PublicationStatus;
  accountId: number;

  setFields(input: Partial<PublicationModel>) {
    this.id = input.id ?? this.id;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.updatedAt = input.updatedAt ?? this.updatedAt;
    this.title = input.title ?? this.title;
    this.description = input.description ?? this.description;
    this.postId = input.postId ?? this.postId;
    this.status = input.status ?? this.status;
    this.accountId = input.accountId ?? this.accountId;

    return this;
  }

  static fromEntity(input: Partial<PublicationModel>) {
    const entity = new PublicationModel().setFields(input);

    return entity;
  }
}
