import { applyDecorators } from '@nestjs/common';
import { defaultDecorators } from './default';
import { ApiOperation } from '@nestjs/swagger';

export const GoogleAuthUrlDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Get google auth url' }),
  );

export const CreateAccountDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Create account' }),
  );

export const GoogleCallbackDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Google auth callback' }),
  );

export const DeleteAccountDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Delete account' }),
  );

export const FindAccountDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Find account' }),
  );

export const UpdateAccountDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Update account' }),
  );
