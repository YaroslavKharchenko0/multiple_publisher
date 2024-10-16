import { updatePublicationPayloadValidationSchema } from "@app/validation";
import { createZodDto } from "@anatine/zod-nestjs";

export class UpdatePublicationDto extends createZodDto(
  updatePublicationPayloadValidationSchema,
) { }
