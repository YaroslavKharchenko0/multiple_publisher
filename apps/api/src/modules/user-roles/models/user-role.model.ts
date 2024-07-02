export class UserRoleModel {
  id: number;
  userId: number;
  roleId: number;

  setFields(input: Partial<UserRoleModel>) {
    this.id = input.id ?? this.id;
    this.userId = input.userId ?? this.userId;
    this.roleId = input.roleId ?? this.roleId;

    return this;
  }

  static fromEntity(input: Partial<UserRoleModel>) {
    const entity = new UserRoleModel().setFields(input);

    return entity;
  }
}
