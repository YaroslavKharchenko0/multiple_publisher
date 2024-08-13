import { FileType, UploadStatus } from '@app/types';
import { FileImage, FileVideo } from '@app/validation';

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

  private toVideoFile(): FileVideo {
    return {
      id: this.id,
      providerId: this.providerId,
      path: null,
      type: FileType.VIDEO,
      uploadStatus: this.uploadStatus,
      authorId: this.authorId,
      createdAt: this.createdAt,
    };
  }

  private toImageFile(): FileImage {
    return {
      id: this.id,
      providerId: null,
      path: this.path,
      type: FileType.IMAGE,
      uploadStatus: null,
      authorId: this.authorId,
      createdAt: this.createdAt,
    };
  }

  toFile(): FileVideo | FileImage {
    const isImage = this.isImage();

    return isImage ? this.toImageFile() : this.toVideoFile();
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
