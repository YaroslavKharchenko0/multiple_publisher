export class WorkspacePostModel {
  id: number;
  workspaceId: number;
  postId: number;

  setFields(input: Partial<WorkspacePostModel>) {
    this.id = input.id ?? this.id;
    this.workspaceId = input.workspaceId ?? this.workspaceId;
    this.postId = input.postId ?? this.postId;

    return this;
  }

  static fromEntity(input: Partial<WorkspacePostModel>) {
    const entity = new WorkspacePostModel().setFields(input);

    return entity;
  }
}
