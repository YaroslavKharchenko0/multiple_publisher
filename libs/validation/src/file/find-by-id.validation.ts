import { z } from 'zod';
import { File, fileId } from './file.validation';

export const findFileByIdValidationSchema = z.object({
  id: fileId,
});

export type FindFileByIdRequest = z.infer<typeof findFileByIdValidationSchema>;

export type FindFileByIdResponse = File;
