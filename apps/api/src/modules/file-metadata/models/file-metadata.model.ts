export class FileMetadataModel {
  id: number;
  fileId: number;
  key: string;
  value: string;

  setFields(input: Partial<FileMetadataModel>) {
    this.id = input.id ?? this.id;
    this.fileId = input.fileId ?? this.fileId;
    this.key = input.key ?? this.key;
    this.value = input.value ?? this.value;

    return this;
  }

  static fromEntity(input: Partial<FileMetadataModel>) {
    const entity = new FileMetadataModel().setFields(input);

    return entity;
  }
}
