import { FileType, UploadStatus } from '@app/types';

export class FileModel {
  id: number;
  providerId: string | null;
  path: string | null;
  type: FileType;
  uploadStatus: UploadStatus | null;
  authorId: number;
  createdAt: Date;

  setFields(input: Partial<FileModel>) {
    this.id = input.id ?? this.id;
    this.providerId = input.providerId ?? this.providerId;
    this.createdAt = input.createdAt ?? this.createdAt;
    this.type = input.type ?? this.type;
    this.uploadStatus = input.uploadStatus ?? this.uploadStatus;
    this.authorId = input.authorId ?? this.authorId;
    this.path = input.path ?? this.path;

    return this;
  }

  isVideo() {
    return this.type === FileType.VIDEO;
  }

  isImage() {
    return this.type === FileType.IMAGE;
  }

  static fromEntity(input: Partial<FileModel>) {
    const entity = new FileModel().setFields(input);

    return entity;
  }
}
