import { signOutValidationSchema, SignOutRequest } from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

import { extendApi } from '@anatine/zod-openapi';

const example: SignOutRequest = {
  accessToken: 'xxx',
};

const withDocs = extendApi(signOutValidationSchema, {
  title: 'SignOutBody',
  example,
});

export class SignOutBodyDto extends createZodDto(withDocs) { }
