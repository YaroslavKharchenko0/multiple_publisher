import { updateAccountPayloadSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UpdateAccountBodyDto extends createZodDto(
  updateAccountPayloadSchema,
) { }
