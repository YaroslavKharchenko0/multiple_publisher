import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Param, Query } from '@nestjs/common';
import {
  FindAccountProviderQuery,
  FindAccountProvidersQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { Auth, IsEnumPipe, ModuleRoute, Route } from '@app/utils';
import { FindAccountProvidersBodyDto } from '@app/dtos';
import { ProviderKey } from '@app/types';
import { FindAccountProvidersDocs } from '@app/docs';

const moduleName = 'accountProviders';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findMany')
  @Auth()
  @FindAccountProvidersDocs()
  findMany(
    @TraceId() traceId: string | undefined,
    @Query() query: FindAccountProvidersBodyDto,
  ) {
    const payload: FindAccountProvidersQuery.Request = query;

    return this.amqpConnection.request<FindAccountProvidersQuery.Response>({
      exchange: FindAccountProvidersQuery.exchange,
      routingKey: FindAccountProvidersQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findOne')
  @Auth()
  findOne(
    @TraceId() traceId: string | undefined,
    @Param('key', new IsEnumPipe(ProviderKey)) key: ProviderKey,
  ) {
    const payload: FindAccountProviderQuery.Request = {
      key,
    };

    return this.amqpConnection.request<FindAccountProviderQuery.Response>({
      exchange: FindAccountProviderQuery.exchange,
      routingKey: FindAccountProviderQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
