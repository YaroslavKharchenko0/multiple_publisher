import { Module } from '@nestjs/common';
import {
  GOOGLE_AUTH_CREDENTIALS,
  GOOGLE_AUTH_SERVICE,
  googleAuthProvider,
  googleAuthService,
} from './gcp.providers';

@Module({})
export class GcpModule {
  static forRoot() {
    return {
      module: GcpModule,
      providers: [googleAuthProvider, googleAuthService],
      exports: [GOOGLE_AUTH_CREDENTIALS, GOOGLE_AUTH_SERVICE],
    };
  }
}
