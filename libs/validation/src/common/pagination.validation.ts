import { z } from 'zod';

export const paginationValidationSchema = z.object({
  offset: z.number().int().positive().optional().default(0),
  limit: z.number().int().positive().optional().default(10),
});

export type Pagination = z.infer<typeof paginationValidationSchema>;
