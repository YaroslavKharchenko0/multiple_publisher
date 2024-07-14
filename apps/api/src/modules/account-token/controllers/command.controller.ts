import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreateAccountTokenCommand,
  createSuccessResponse,
  DeleteAccountTokensCommand,
} from '@app/contracts';
import { ACCOUNT_TOKEN_SERVICE } from '../providers/account-token.providers';
import { AccountTokenService } from '../services/account-token.service';
import { TraceId } from '@app/logger';

@Controller()
export class CommandController {
  constructor(
    @Inject(ACCOUNT_TOKEN_SERVICE)
    private readonly service: AccountTokenService,
  ) { }

  @RabbitRPC({
    exchange: CreateAccountTokenCommand.exchange,
    routingKey: CreateAccountTokenCommand.routingKey,
    queue: CreateAccountTokenCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreateAccountTokenCommand.Request,
  ): Promise<CreateAccountTokenCommand.Response> {
    const payload = await this.service.createToken({
      accountId: message.accountId,
      token: message.token,
      type: message.type,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeleteAccountTokensCommand.exchange,
    routingKey: DeleteAccountTokensCommand.routingKey,
    queue: DeleteAccountTokensCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeleteAccountTokensCommand.Request,
    @TraceId() traceId: string | undefined,
  ): Promise<DeleteAccountTokensCommand.Response> {
    const payload = await this.service.deleteTokens(message.accountId, { traceId });

    return createSuccessResponse(payload);
  }
}
