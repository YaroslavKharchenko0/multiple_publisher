import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_AUTH_CREDENTIALS } from './gcp.providers';
import { GoogleAuthConfig } from './google.config';

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

  generateAuthUrl(userId: number) {
    const url = this.client.generateAuthUrl({
      access_type: 'offline',
      scope: this.config.scopes,
      state: String(userId),
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
}
