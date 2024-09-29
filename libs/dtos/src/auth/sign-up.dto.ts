import { signUpValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod';

export class SignUpBodyDto extends createZodDto(signUpValidationSchema) { }
