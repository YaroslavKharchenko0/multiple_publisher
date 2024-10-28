import { userValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class UserDto extends createZodDto(userValidationSchema) { }
