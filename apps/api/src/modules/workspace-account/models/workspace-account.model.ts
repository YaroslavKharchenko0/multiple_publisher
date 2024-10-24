export class WorkspaceAccountModel {
  id: number;
  workspaceId: number;
  accountId: number;

  setFields(input: Partial<WorkspaceAccountModel>) {
    this.id = input.id ?? this.id;
    this.workspaceId = input.workspaceId ?? this.workspaceId;
    this.accountId = input.accountId ?? this.accountId;

    return this;
  }

  static fromEntity(input: Partial<WorkspaceAccountModel>) {
    const entity = new WorkspaceAccountModel().setFields(input);

    return entity;
  }
}
