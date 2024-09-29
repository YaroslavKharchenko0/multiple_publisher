import { postValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PostDto extends createZodDto(postValidationSchema) { }
