import { applyDecorators } from '@nestjs/common';
import { defaultDecorators } from './default';
import { ApiOperation } from '@nestjs/swagger';

export const SignUpDocs = () =>
  applyDecorators(...defaultDecorators, ApiOperation({ summary: 'Sign up' }));

export const SignInDocs = () =>
  applyDecorators(...defaultDecorators, ApiOperation({ summary: 'Sign in' }));

export const VerifyEmailDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Verify email' }),
  );
