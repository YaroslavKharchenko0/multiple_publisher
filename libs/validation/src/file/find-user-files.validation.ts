import { z } from 'zod';
import { File } from './file.validation';
import { userId } from '../user';
import { paginationValidationSchema } from '../common';

export const findUserFilesValidationSchema = z.object({
  userId,
  pagination: paginationValidationSchema,
});

export type FindUserFilesRequest = z.infer<
  typeof findUserFilesValidationSchema
>;

export type FindUserFilesResponse = File[];
