import { GetAccountTokensQuery, createSuccessResponse } from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { ACCOUNT_TOKEN_SERVICE } from '../providers/account-token.providers';
import { AccountTokenService } from '../services/account-token.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(ACCOUNT_TOKEN_SERVICE)
    private readonly service: AccountTokenService,
  ) {}

  @RabbitRPC({
    exchange: GetAccountTokensQuery.exchange,
    routingKey: GetAccountTokensQuery.routingKey,
    queue: GetAccountTokensQuery.queue,
  })
  async delete(
    @RabbitPayload() message: GetAccountTokensQuery.Request,
  ): Promise<GetAccountTokensQuery.Response> {
    const payload = await this.service.getTokens(message.accountId);

    return createSuccessResponse(payload);
  }
}
