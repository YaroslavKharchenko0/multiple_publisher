export class WorkspaceUserModel {
  id: number;
  userId: number;
  workspaceId: number;
  roleId: number;
  joinedAt: Date;

  setFields(input: Partial<WorkspaceUserModel>) {
    this.id = input.id ?? this.id;
    this.userId = input.userId ?? this.userId;
    this.workspaceId = input.workspaceId ?? this.workspaceId;
    this.roleId = input.roleId ?? this.roleId;
    this.joinedAt = input.joinedAt ?? this.joinedAt;

    return this;
  }

  static fromEntity(input: Partial<WorkspaceUserModel>) {
    const entity = new WorkspaceUserModel().setFields(input);

    return entity;
  }
}
