import { z } from 'zod';
import { FileMetadata } from './file-metadata.validation';
import { fileId } from '../file/file.validation';
import { paginationValidationSchema } from '../common';

export const findFileMetadataByFileIdValidationSchema = z.object({
  fileId,
  pagination: paginationValidationSchema,
});

export type FindFileMetadataByFileIdRequest = z.infer<
  typeof findFileMetadataByFileIdValidationSchema
>;

export const findFileMetadataByFileIdBodyValidationSchema =
  findFileMetadataByFileIdValidationSchema.omit({ fileId: true });

export type FindFileMetadataByFileIdResponse = FileMetadata[];
