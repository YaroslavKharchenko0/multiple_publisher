import { Role } from '@app/types';

export class RoleModel {
  id: number;
  role: Role;

  setFields(input: Partial<RoleModel>) {
    this.id = input.id ?? this.id;
    this.role = input.role ?? this.role;

    return this;
  }

  static fromEntity(input: Partial<RoleModel>) {
    const entity = new RoleModel().setFields(input);

    return entity;
  }
}
