import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreatePublicationProviderCommand,
  DeletePublicationProviderCommand,
  FindPublicationProviderQuery,
  FindPublicationProvidersByAccountProviderQuery,
  FindPublicationProvidersQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  CreatePublicationProviderDto,
  FindPublicationProvidersDto,
} from '@app/dtos';
import { IsEnumPipe, IsStringNumberPipe, Roles } from '@app/utils';
import { PublicationProvider, Role } from '@app/types';

@Controller()
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('publication/providers/')
  @Roles(Role.ADMIN)
  create(
    @TraceId() traceId: string | undefined,
    @Body() body: CreatePublicationProviderDto,
  ) {
    const payload: CreatePublicationProviderCommand.Request = body;

    return this.amqpConnection.request<CreatePublicationProviderCommand.Response>(
      {
        exchange: CreatePublicationProviderCommand.exchange,
        routingKey: CreatePublicationProviderCommand.routingKey,
        payload,
        headers: {
          traceId,
        },
      },
    );
  }

  @Delete('publication/providers/:key')
  @Roles(Role.ADMIN)
  delete(
    @TraceId() traceId: string | undefined,
    @Param('key', new IsEnumPipe(PublicationProvider)) key: PublicationProvider,
  ) {
    const payload: DeletePublicationProviderCommand.Request = {
      key,
    };

    return this.amqpConnection.request<DeletePublicationProviderCommand.Response>(
      {
        exchange: DeletePublicationProviderCommand.exchange,
        routingKey: DeletePublicationProviderCommand.routingKey,
        payload,
        headers: {
          traceId,
        },
      },
    );
  }

  @Get('publication/providers/:key')
  findOne(
    @TraceId() traceId: string | undefined,
    @Param('key', new IsEnumPipe(PublicationProvider)) key: PublicationProvider,
  ) {
    const payload: FindPublicationProviderQuery.Request = {
      key,
    };

    return this.amqpConnection.request<FindPublicationProviderQuery.Response>({
      exchange: FindPublicationProviderQuery.exchange,
      routingKey: FindPublicationProviderQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('publication/providers/')
  findMany(
    @TraceId() traceId: string | undefined,
    @Query() query: FindPublicationProvidersDto,
  ) {
    const payload: FindPublicationProvidersQuery.Request = {
      pagination: query,
    };

    return this.amqpConnection.request<FindPublicationProvidersQuery.Response>({
      exchange: FindPublicationProvidersQuery.exchange,
      routingKey: FindPublicationProvidersQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('accounts/providers/:accountProviderId/publications/providers')
  findManyByAccountProvider(
    @TraceId() traceId: string | undefined,
    @Param('accountProviderId', IsStringNumberPipe) accountProviderId: string,
  ) {
    const payload: FindPublicationProvidersByAccountProviderQuery.Request = {
      accountProviderId: Number(accountProviderId),
    };

    return this.amqpConnection.request<FindPublicationProvidersByAccountProviderQuery.Response>(
      {
        exchange: FindPublicationProvidersByAccountProviderQuery.exchange,
        routingKey: FindPublicationProvidersByAccountProviderQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      },
    );
  }
}
