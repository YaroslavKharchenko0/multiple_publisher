import { FileType, UploadStatus } from '@app/types';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { userId } from '../user';

export const fileId = z.number();
export const fileProviderId = z.string().uuid().readonly().nullable();
export const fileType = z.nativeEnum(FileType);
export const fileUploadStatus = z.nativeEnum(UploadStatus).nullable();
export const filePath = z.string().nullable();

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

export class FileDto extends createZodDto(fileValidationSchema) { }
