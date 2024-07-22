import { Inject } from '@nestjs/common';
import { GOOGLE_AUTH_SERVICE } from './gcp.providers';

export const GcpAuth = () => Inject(GOOGLE_AUTH_SERVICE);
