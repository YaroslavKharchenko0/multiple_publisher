import { PostType } from '@app/types';

export class PostModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  type: PostType;
  title: string;
  description: string;

  setFields(input: Partial<PostModel>) {
    this.id = input.id ?? this.id;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.updatedAt = input.updatedAt ?? this.updatedAt;
    this.userId = input.userId ?? this.userId;
    this.type = input.type ?? this.type;
    this.title = input.title ?? this.title;
    this.description = input.description ?? this.description;

    return this;
  }

  static fromEntity(input: Partial<PostModel>) {
    const entity = new PostModel().setFields(input);

    return entity;
  }
}
