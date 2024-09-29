import { postFileValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class PostFileDto extends createZodDto(postFileValidationSchema) { }
