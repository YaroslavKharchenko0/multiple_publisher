import { updateAccountPayloadSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UpdateAccountBodyDto extends createZodDto(
  updateAccountPayloadSchema,
) { }
