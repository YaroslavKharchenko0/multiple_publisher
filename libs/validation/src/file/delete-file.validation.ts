import { z } from 'zod';
import { File, fileId } from './file.validation';
import { userId } from '../user';

export const deleteFileValidationSchema = z.object({
  id: fileId,
  userId: userId.optional(),
});

export type DeleteFileRequest = z.infer<typeof deleteFileValidationSchema>;

export type DeleteFileResponse = File;
