import { applyDecorators } from '@nestjs/common';
import { defaultDecorators } from './default';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SignInBodyDto } from '@app/dtos';

export const SignUpDocs = () =>
  applyDecorators(...defaultDecorators, ApiOperation({ summary: 'Sign up' }));

export const SignInDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Sign in' }),
    ApiBody({ type: SignInBodyDto }),
  );

export const VerifyEmailDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Verify email' }),
  );

export const SignOutDocs = () =>
  applyDecorators(...defaultDecorators, ApiOperation({ summary: 'Sign out' }));

export const KeepSessionDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Keep session' }),
  );
