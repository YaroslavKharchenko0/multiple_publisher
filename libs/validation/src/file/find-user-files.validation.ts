import { z } from 'zod';
import { File } from './file.validation';
import { userId } from '../user';
import { PaginationMetadata, paginationValidationSchema } from '../common';

export const findUserFilesValidationSchema = z.object({
  userId,
  pagination: paginationValidationSchema,
});

export type FindUserFilesRequest = z.infer<
  typeof findUserFilesValidationSchema
>;

export type FindUserFilesResponse = {
  files: File[];
  metadata: PaginationMetadata;
};
