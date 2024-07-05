export class FileModel {
  id: number;
  fileId: number;
  key: string;
  value: string;

  setFields(input: Partial<FileModel>) {
    this.id = input.id ?? this.id;
    this.fileId = input.fileId ?? this.fileId;
    this.key = input.key ?? this.key;
    this.value = input.value ?? this.value;

    return this;
  }

  static fromEntity(input: Partial<FileModel>) {
    const entity = new FileModel().setFields(input);

    return entity;
  }
}
