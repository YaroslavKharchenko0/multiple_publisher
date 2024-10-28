import { postFileValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class PostFileDto extends createZodDto(postFileValidationSchema) { }
