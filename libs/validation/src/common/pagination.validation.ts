import { z } from 'zod';

export const paginationValidationSchema = z.object({
  offset: z.number().int().positive().optional().default(0).describe('Offset'),
  limit: z.number().int().positive().optional().default(10).describe('Limit'),
});

export type Pagination = z.infer<typeof paginationValidationSchema>;

export const paginationMetadataValidationSchema = z.object({
  total: z.number().int().positive().optional().default(0).describe('Total'),
});

export type PaginationMetadata = z.infer<
  typeof paginationMetadataValidationSchema
>;
