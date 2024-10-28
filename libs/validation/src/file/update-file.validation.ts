import { z } from 'zod';
import {
  File,
  fileId,
  fileProviderId,
  fileType,
  fileUploadStatus,
} from './file.validation';
import { userId } from '../user';

export const updateFileValidationSchema = z.object({
  id: fileId,
  providerId: fileProviderId,
  type: fileType,
  authorId: userId,
  uploadStatus: fileUploadStatus,
});

export type UpdateFileRequest = z.infer<typeof updateFileValidationSchema>;

export const updateFileBodyValidationSchema = updateFileValidationSchema.omit({
  id: true,
});

export type UpdateFileResponse = File;
