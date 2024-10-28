import {
  keepSessionValidationSchema,
  KeepSessionRequest,
} from '@app/validation';
import { createZodDto } from '@anatine/zod-nestjs';

import { extendApi } from '@anatine/zod-openapi';

const example: KeepSessionRequest = {
  refreshToken: 'xxx',
};

const withDocs = extendApi(keepSessionValidationSchema, {
  title: 'KeepSessionBody',
  example,
});

export class KeepSessionBodyDto extends createZodDto(withDocs) { }
