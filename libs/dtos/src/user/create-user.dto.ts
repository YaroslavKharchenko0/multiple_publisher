import { createUserValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class CreateUserBodyDto extends createZodDto(createUserValidationSchema) { }
