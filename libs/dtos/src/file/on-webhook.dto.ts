import { onWebhookValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class OnWebhookBodyDto extends createZodDto(onWebhookValidationSchema) { }
