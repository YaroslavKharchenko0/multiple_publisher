import { userValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class UserDto extends createZodDto(userValidationSchema) { }
