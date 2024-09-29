import { signInValidationSchema } from '@app/validation';
import { createZodDto } from 'nestjs-zod'

export class SignInBodyDto extends createZodDto(signInValidationSchema) { }
