import { Inject, Injectable } from "@nestjs/common";
import { GOOGLE_AUTH_CREDENTIALS } from "../providers/account.providers";
import { GoogleAuthConfig } from "../configs/google.config";
import { OAuth2Client } from 'google-auth-library';
import { RmqErrorService } from "@app/errors";

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(@Inject(GOOGLE_AUTH_CREDENTIALS) private readonly config: GoogleAuthConfig, private readonly rmqErrorService: RmqErrorService) {
    this.client = this.createClient();
  }

  private createClient() {
    const client = new OAuth2Client(this.config.clientId, this.config.clientSecret, this.config.redirectUri);

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
      const { tokens, res } = await this.client.getToken(code)

      if (res.status !== 200) {
        throw this.rmqErrorService.unauthorized()
      }

      return tokens;
    }
    catch (error) {
      throw this.rmqErrorService.unauthorized()
    }
  }
}
