import { ConfigService } from '@nestjs/config';

export interface GoogleAuthConfig {
  scopes: string[];
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export const createGoogleAuthConfig = (
  configService: ConfigService,
): GoogleAuthConfig => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  const clientId = configService.getOrThrow('GOOGLE_CLIENT_ID');
  const clientSecret = configService.getOrThrow('GOOGLE_CLIENT_SECRET');

  const redirectUri = configService.getOrThrow('GOOGLE_REDIRECT_URI');

  return {
    scopes,
    clientId,
    clientSecret,
    redirectUri,
  };
};
