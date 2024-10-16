import { postValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class PostDto extends createZodDto(postValidationSchema) { }
