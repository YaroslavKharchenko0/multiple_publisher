import { applyDecorators } from '@nestjs/common';
import { defaultDecorators } from './default';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SignUpBodyDto } from '@app/dtos';

export const SignUpDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Sign up' }),
    ApiBody({ type: SignUpBodyDto }),
  );
