import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateAccountCommand,
  createSuccessResponse,
  DeleteAccountCommand,
  GoogleCallbackCommand,
  GoogleSingInUrlCommand,
  UpdateAccountCommand,
} from '@app/contracts';
import { ACCOUNT_SERVICE } from '../providers/account.providers';
import { AccountService } from '../services/account.service';
import { TraceId } from '@app/logger';
import { GcpAuth, GoogleAuthService } from '@app/gcp';
import * as jwt from 'jsonwebtoken';
import { ProviderKey } from '@app/types';
import { CryptoJwt, JwtService, CryptoJwe, JweService } from '@app/crypto';

@Controller()
export class CommandController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly service: AccountService,
    @GcpAuth() private readonly googleAuthService: GoogleAuthService,
    @CryptoJwt() private readonly jwtService: JwtService,
    @CryptoJwe() private readonly jweService: JweService,
  ) { }

  @RabbitRPC({
    exchange: CreateAccountCommand.exchange,
    routingKey: CreateAccountCommand.routingKey,
    queue: CreateAccountCommand.queue,
  })
  async create(
    @TraceId() traceId: string | undefined,
    @RabbitPayload() message: CreateAccountCommand.Request,
  ): Promise<CreateAccountCommand.Response> {
    const payload = await this.service.createAccount(
      {
        name: message.name,
        provider: message.provider,
        status: message.status,
        userId: message.userId,
      },
      { traceId },
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteAccountCommand.exchange,
    routingKey: DeleteAccountCommand.routingKey,
    queue: DeleteAccountCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeleteAccountCommand.Request,
  ): Promise<DeleteAccountCommand.Response> {
    const payload = await this.service.deleteAccountById(message.id);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdateAccountCommand.exchange,
    routingKey: UpdateAccountCommand.routingKey,
    queue: UpdateAccountCommand.queue,
  })
  async update(
    @RabbitPayload() message: UpdateAccountCommand.Request,
  ): Promise<UpdateAccountCommand.Response> {
    const payload = await this.service.updateAccountById(
      message.id,
      message.payload,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: GoogleSingInUrlCommand.exchange,
    routingKey: GoogleSingInUrlCommand.routingKey,
    queue: GoogleSingInUrlCommand.queue,
  })
  async googleSignInUrl(
    @RabbitPayload() message: GoogleSingInUrlCommand.Request,
  ): Promise<GoogleSingInUrlCommand.Response> {
    const jwtSign = this.jwtService.sign(String(message.userId));

    const state = await this.jweService.encryptJWE(jwtSign);

    const url = this.googleAuthService.generateAuthUrl(state);

    return createSuccessResponse({
      url,
    });
  }

  @RabbitRPC({
    exchange: GoogleCallbackCommand.exchange,
    routingKey: GoogleCallbackCommand.routingKey,
    queue: GoogleCallbackCommand.queue,
  })
  async googleCallback(
    @TraceId() traceId: string | undefined,
    @RabbitPayload() message: GoogleCallbackCommand.Request,
  ) {
    const tokens = await this.googleAuthService.authByCode(message.code);

    const decodedToken = jwt.decode(tokens.id_token);

    const providerId = decodedToken['sub'] as string;

    const accountTokens = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    };

    const jwtSign = await this.jweService.decryptJWE<string>(message.state);

    const { data } = this.jwtService.verify(jwtSign);

    await this.service.onSignIn(
      {
        internalId: providerId,
        accountTokens,
        provider: ProviderKey.GOOGLE,
        userId: Number(data),
      },
      { traceId },
    );
  }
}
