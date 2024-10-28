import { signUpSuccessValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

export class SignUpSuccessDto extends createZodDto(
  signUpSuccessValidationSchema,
) { }
