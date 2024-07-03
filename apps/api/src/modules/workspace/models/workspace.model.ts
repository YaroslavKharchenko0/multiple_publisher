export class WorkspaceModel {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;

  setFields(input: Partial<WorkspaceModel>) {
    this.id = input.id ?? this.id;
    this.userId = input.userId ?? this.userId;
    this.name = input.name ?? this.name;
    this.createdAt = input.createdAt ?? this.createdAt;

    return this;
  }

  static fromEntity(input: Partial<WorkspaceModel>) {
    const entity = new WorkspaceModel().setFields(input);

    return entity;
  }
}
