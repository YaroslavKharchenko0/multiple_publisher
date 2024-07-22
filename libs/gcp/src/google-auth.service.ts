import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_AUTH_CREDENTIALS } from './gcp.providers';
import { GoogleAuthConfig } from './google.config';
import { RefreshTokensParams } from './google-auth.types';

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(
    @Inject(GOOGLE_AUTH_CREDENTIALS) private readonly config: GoogleAuthConfig,
  ) {
    this.client = this.createClient();
  }

  private createClient() {
    const client = new OAuth2Client(
      this.config.clientId,
      this.config.clientSecret,
      this.config.redirectUri,
    );

    return client;
  }

  generateAuthUrl(state: string) {
    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: this.config.scopes,
      state,
    });

    return url;
  }

  async authByCode(code: string) {
    try {
      const { tokens, res } = await this.client.getToken(code);

      if (res?.status !== 200) {
        throw Error('Failed to authenticate');
      }

      return tokens;
    } catch (error) {
      throw Error('Failed to authenticate');
    }
  }

  async refreshTokens(params: RefreshTokensParams) {
    try {
      const { accessToken, refreshToken } = params;

      this.client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const { credentials, res } = await this.client.refreshAccessToken();

      if (res?.status !== 200) {
        throw Error('Failed to authenticate');
      }

      return credentials;
    } catch (error) {
      throw Error('Failed to refresh token');
    }
  }
}
