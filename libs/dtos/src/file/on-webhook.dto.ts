import { onWebhookValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class OnWebhookBodyDto extends createZodDto(onWebhookValidationSchema) { }
