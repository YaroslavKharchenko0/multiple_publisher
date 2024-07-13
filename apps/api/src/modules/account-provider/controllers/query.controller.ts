import {
  FindAccountProviderQuery,
  FindAccountProvidersQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { ACCOUNT_PROVIDER_SERVICE } from '../providers/account-provider.providers';
import { AccountProviderService } from '../services/account-provider.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(ACCOUNT_PROVIDER_SERVICE)
    private readonly service: AccountProviderService,
  ) {}

  @RabbitRPC({
    exchange: FindAccountProviderQuery.exchange,
    routingKey: FindAccountProviderQuery.routingKey,
    queue: FindAccountProviderQuery.queue,
  })
  async findOne(
    @RabbitPayload() message: FindAccountProviderQuery.Request,
  ): Promise<FindAccountProviderQuery.Response> {
    const payload = await this.service.findAccountProvider(message.key);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindAccountProvidersQuery.exchange,
    routingKey: FindAccountProvidersQuery.routingKey,
    queue: FindAccountProvidersQuery.queue,
  })
  async findMany(
    @RabbitPayload() message: FindAccountProvidersQuery.Request,
  ): Promise<FindAccountProvidersQuery.Response> {
    const payload = await this.service.findAccountProviders(message.pagination);

    return createSuccessResponse(payload);
  }
}
