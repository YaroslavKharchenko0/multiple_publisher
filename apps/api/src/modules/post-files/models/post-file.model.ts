export class PostFileModel {
  id: number;
  postId: number;
  fileId: number;

  setFields(input: Partial<PostFileModel>) {
    this.id = input.id ?? this.id;
    this.postId = input.postId ?? this.postId;
    this.fileId = input.fileId ?? this.fileId;

    return this;
  }

  static fromEntity(input: Partial<PostFileModel>) {
    const entity = new PostFileModel().setFields(input);

    return entity;
  }
}
