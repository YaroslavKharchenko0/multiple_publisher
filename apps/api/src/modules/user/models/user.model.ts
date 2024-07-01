export class UserModel {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  setFields(input: Partial<UserModel>) {
    this.id = input.id ?? this.id;
    this.email = input.email ?? this.email;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.updatedAt = input.updatedAt ?? this.updatedAt;

    return this;
  }

  static fromEntity(input: Partial<UserModel>) {
    const entity = new UserModel().setFields(input);

    return entity;
  }
}
