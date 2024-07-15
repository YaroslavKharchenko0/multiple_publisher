import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateAccountCommand,
  createSuccessResponse,
  DeleteAccountCommand,
  GoogleSingInUrlCommand,
  UpdateAccountCommand,
} from '@app/contracts';
import { ACCOUNT_SERVICE } from '../providers/account.providers';
import { AccountService } from '../services/account.service';
import { TraceId } from '@app/logger';
import { GcpAuth, GoogleAuthService } from '@app/gcp';

@Controller()
export class CommandController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly service: AccountService,
    @GcpAuth() private readonly googleAuthService: GoogleAuthService,
  ) { }

  @RabbitRPC({
    exchange: CreateAccountCommand.exchange,
    routingKey: CreateAccountCommand.routingKey,
    queue: CreateAccountCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreateAccountCommand.Request,
    @TraceId() traceId: string | undefined,
  ): Promise<CreateAccountCommand.Response> {
    const payload = await this.service.createAccount(
      {
        name: message.name,
        provider: message.provider,
        status: message.status,
        userId: message.userId,
        internalId: message.internalId,
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
    const url = this.googleAuthService.generateAuthUrl(message.userId);

    return createSuccessResponse({
      url,
    });
  }
}
