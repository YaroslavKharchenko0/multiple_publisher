import { z } from 'zod';
import {
  File,
  filePath,
  fileProviderId,
  fileType,
  fileUploadStatus,
} from './file.validation';
import { userId } from '../user';

export const createFileValidationSchema = z.object({
  providerId: fileProviderId,
  type: fileType,
  authorId: userId,
  uploadStatus: fileUploadStatus,
  path: filePath,
});

export type CreateFileRequest = z.infer<typeof createFileValidationSchema>;

export type CreateFileResponse = File;
