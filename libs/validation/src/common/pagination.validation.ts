import { z } from 'zod';

const offset = z.number().int().min(0).optional().default(0);

const limit = z.number().int().positive().optional().default(10);

export const paginationValidationSchema = z.object({
  offset: z
    .string()
    .transform((value) => parseInt(value, 0))
    .refine(
      (value) => {
        return offset.safeParse(value).success;
      },
      {
        message: 'Offset should be a positive integer',
      },
    )
    .describe('Offset'),
  limit: z
    .string()
    .transform((value) => parseInt(value, 10))
    .refine((value) => limit.safeParse(value).success, {
      message: 'Limit should be a positive integer',
    })
    .describe('Limit'),
});
export type Pagination = z.infer<typeof paginationValidationSchema>;

export const paginationMetadataValidationSchema = z.object({
  total: z.number().int().positive().optional().default(0).describe('Total'),
});

export type PaginationMetadata = z.infer<
  typeof paginationMetadataValidationSchema
>;
