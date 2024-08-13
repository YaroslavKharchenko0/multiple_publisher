import { FileType, UploadStatus } from '@app/types';
import { File } from '@app/validation';
import { VideoFileConfig } from '../configs/file-validator';

export const validUploadStatues = [
  UploadStatus.FINISHED,
  UploadStatus.RESOLUTION_FINISHED,
  UploadStatus.PRESIGNED_UPLOAD_FINISHED,
];

export interface BlobObject {
  file: File;
  config: VideoFileConfig;
}

export abstract class FileValidatorAbstract {
  validFiles(objects: BlobObject[]): BlobObject[] {
    const isValidFiles = this.validateFiles(objects);

    if (!isValidFiles) {
      return [];
    }

    const validFiles = objects.filter((object) => {
      if (object.file.type === FileType.VIDEO) {
        const { file } = object;

        const isHasUploadStatus = !!file.uploadStatus;

        if (!isHasUploadStatus) {
          return false;
        }

        const isValidStatus = validUploadStatues.includes(file.uploadStatus);

        if (!isValidStatus) {
          return false;
        }

        return this.validateVideoFile(object);
      }
      if (object.file.type === FileType.IMAGE) {
        return this.validateImageFile(object);
      }
      return false;
    });

    return validFiles;
  }
  abstract validateFiles(files: BlobObject[]): boolean;
  abstract validateVideoFile(file: BlobObject): boolean;
  abstract validateImageFile(file: BlobObject): boolean;
}
