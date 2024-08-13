import { z } from 'nestjs-zod/z';
import { Publication, publicationId } from './publication.validation';
import { createZodDto } from 'nestjs-zod';

export const findPublicationByIdValidationSchema = z.object({
  id: publicationId,
});

export type FindPublicationByIdRequest = z.infer<
  typeof findPublicationByIdValidationSchema
>;

export class FindPublicationByIdDto extends createZodDto(
  findPublicationByIdValidationSchema,
) { }

export type FindPublicationByIdResponse = Publication;
