import { signUpSuccessValidationSchema } from '@app/validation';
import { z } from 'nestjs-zod/z';

export type SignUpSuccessRequest = z.infer<
  typeof signUpSuccessValidationSchema
>;
