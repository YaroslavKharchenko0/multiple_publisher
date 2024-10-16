import { signInValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs'

export class SignInBodyDto extends createZodDto(signInValidationSchema) { }
