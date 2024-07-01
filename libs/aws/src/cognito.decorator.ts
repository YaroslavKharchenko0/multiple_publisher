import { Inject } from '@nestjs/common';
import { COGNITO_SERVICE } from './constants';

export const Cognito = () => Inject(COGNITO_SERVICE);
