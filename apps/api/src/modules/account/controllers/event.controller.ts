import { GoogleCallbackEvent } from '@app/contracts';
import { RabbitPayload, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { ACCOUNT_SERVICE, GOOGLE_AUTH_CREDENTIALS } from '../providers/account.providers';
import { AccountService } from '../services/account.service';
import { GoogleAuthService } from '../services/google-auth.service';
import { TraceId } from '@app/logger';
import * as jwt from 'jsonwebtoken';
import { AccountStatus, ProviderKey } from '@app/types';
import { CreateAccountParams } from '../services/account.service.interface';

@Controller()
export class EventController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly service: AccountService,
    @Inject(GOOGLE_AUTH_CREDENTIALS) private readonly googleAuthCredentials: GoogleAuthService,
  ) { }

  @RabbitSubscribe({
    exchange: GoogleCallbackEvent.exchange,
    routingKey: GoogleCallbackEvent.routingKey,
    queue: GoogleCallbackEvent.queue,
  })
  async googleCallback(
    @RabbitPayload() message: GoogleCallbackEvent.Request,
    @TraceId() traceId: string | undefined,
  ) {
    const tokens = await this.googleAuthCredentials.authByCode(message.code);

    const decodedToken = jwt.decode(tokens.id_token);

    const providerId = decodedToken['sub'] as string;

    const accountTokens = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    }

    const account = await this.service.findAccountByInternalId(providerId);

    const isExistAccount = !!account;

    if (isExistAccount) {
      await this.service.createAccountTokens(account, accountTokens, { traceId });

      return;
    }

    const payload: CreateAccountParams = {
      provider: ProviderKey.GOOGLE,
      userId: message.userId,
      status: AccountStatus.INACTIVE,
      internalId: providerId,
      name: ProviderKey.GOOGLE,
    }

    const createdAccount = await this.service.createAccount(payload, { traceId });

    await this.service.createAccountTokens(createdAccount, accountTokens, { traceId });
  }
}
