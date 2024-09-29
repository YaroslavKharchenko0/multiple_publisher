import { findPublicationFilesValidationSchema } from "@app/validation";
import { createZodDto } from "nestjs-zod";

export class FindPublicationFilesDto extends createZodDto(
  findPublicationFilesValidationSchema,
) { }
