import { signInValidationSchema } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

import { extendApi } from '@anatine/zod-openapi';

const withDocs = extendApi(signInValidationSchema, {
  title: 'SignInBody',
  example: { email: 'some@gmail.com', password: 'Password' },
});

export class SignInBodyDto extends createZodDto(withDocs) { }
