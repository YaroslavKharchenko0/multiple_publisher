import { z } from 'zod';
import { fileId } from '../file/file.validation';

export const fileMetadataId = z.number();

export const fileMetadataValidationSchema = z.object({
  id: fileMetadataId,
  key: z.string(),
  value: z.string(),
  fileId,
});

export type FileMetadata = z.infer<typeof fileMetadataValidationSchema>;
