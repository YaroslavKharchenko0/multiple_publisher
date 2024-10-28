import { applyDecorators } from '@nestjs/common';
import { defaultDecorators } from './default';
import { ApiOperation } from '@nestjs/swagger';

export const FindAccountProvidersDocs = () =>
  applyDecorators(
    ...defaultDecorators,
    ApiOperation({ summary: 'Find account providers' }),
  );
