import { WorkspaceRole } from '@app/types';

export class WorkspaceRoleModel {
  id: number;
  role: WorkspaceRole;

  setFields(input: Partial<WorkspaceRoleModel>) {
    this.id = input.id ?? this.id;
    this.role = input.role ?? this.role;

    return this;
  }

  static fromEntity(input: Partial<WorkspaceRoleModel>) {
    const entity = new WorkspaceRoleModel().setFields(input);

    return entity;
  }
}
