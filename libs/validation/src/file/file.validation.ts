import { FileType, UploadStatus } from '@app/types';
import { z } from 'zod';
import { userId } from '../user';

export const fileId = z.number().describe('File id');
export const fileProviderId = z
  .string()
  .uuid()
  .readonly()
  .nullable()
  .describe('File provider id');
export const fileType = z.nativeEnum(FileType).describe('File type');
export const fileUploadStatus = z
  .nativeEnum(UploadStatus)
  .nullable()
  .describe('File upload status');
export const filePath = z.string().nullable().describe('File path');

export const fileValidationSchema = z.object({
  id: fileId,
  providerId: fileProviderId,
  type: fileType,
  uploadStatus: fileUploadStatus,
  authorId: userId,
  createdAt: z.date(),
  path: filePath,
});

export const fileImageValidationSchema = fileValidationSchema.extend({
  path: z.string().readonly(),
  providerId: z.null(),
  uploadStatus: z.null(),
  type: z.enum([FileType.IMAGE]),
});

export type FileImage = z.infer<typeof fileImageValidationSchema>;

export const fileVideoValidationSchema = fileValidationSchema.extend({
  providerId: z.string().uuid().readonly(),
  path: z.null(),
  uploadStatus: z.nativeEnum(UploadStatus),
  type: z.enum([FileType.VIDEO]),
});

export type FileVideo = z.infer<typeof fileVideoValidationSchema>;

export type File = FileVideo | FileImage;
