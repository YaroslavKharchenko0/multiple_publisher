import { InsertUser } from '../repositories/user.repository'
export class UserModel {
  id: number;
  email: string;
  providerId: string;
  createdAt: Date;
  name?: string;
  birthDate?: Date;
  updatedAt: Date;

  setFields(input: Partial<UserModel>) {
    this.id = input.id ?? this.id;
    this.email = input.email ?? this.email;
    this.providerId = input.providerId ?? this.providerId;
    this.name = input.name ?? this.name;
    this.birthDate = input.birthDate ?? this.birthDate;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.updatedAt = input.updatedAt ?? this.updatedAt;

    return this;
  }

  static fromEntity(input: Partial<InsertUser>) {
    const entity = new UserModel().setFields(input);

    return entity;
  }
}
