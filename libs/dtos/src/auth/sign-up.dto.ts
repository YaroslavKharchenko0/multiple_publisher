import { signUpValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class SignUpBodyDto extends createZodDto(signUpValidationSchema) { }
