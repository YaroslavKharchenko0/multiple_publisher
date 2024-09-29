import { updatePublicationPayloadValidationSchema } from "@app/validation";
import { createZodDto } from "nestjs-zod";

export class UpdatePublicationDto extends createZodDto(
  updatePublicationPayloadValidationSchema,
) { }
