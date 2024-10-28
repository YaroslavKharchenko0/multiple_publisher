import { findPublicationFilesValidationSchema } from "@app/validation";
import { createZodDto } from "@anatine/zod-nestjs";

export class FindPublicationFilesDto extends createZodDto(
  findPublicationFilesValidationSchema,
) { }
