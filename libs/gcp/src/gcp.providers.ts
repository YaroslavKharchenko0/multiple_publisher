import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createGoogleAuthConfig, GoogleAuthConfig } from './google.config';
import { GoogleAuthService } from './google-auth.service';

export const GOOGLE_AUTH_CREDENTIALS = 'GOOGLE_AUTH_CREDENTIALS';

export const googleAuthProvider: Provider = {
  provide: GOOGLE_AUTH_CREDENTIALS,
  useFactory: (configService: ConfigService) => {
    const config = createGoogleAuthConfig(configService);

    return config;
  },
  inject: [ConfigService],
};

export const GOOGLE_AUTH_SERVICE = 'GOOGLE_AUTH_SERVICE';

export const googleAuthService: Provider = {
  provide: GOOGLE_AUTH_SERVICE,
  useFactory: (config: GoogleAuthConfig) => {
    return new GoogleAuthService(config);
  },
  inject: [GOOGLE_AUTH_CREDENTIALS],
};
