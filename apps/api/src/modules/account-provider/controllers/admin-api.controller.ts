import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import {
  CreateAccountProviderCommand,
  DeleteAccountProviderCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsEnumPipe, Roles } from '@app/utils';
import { CreateAccountProviderBodyDto } from '@app/dtos';
import { ProviderKey, Role } from '@app/types';

@Controller('admin/accounts/providers')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/')
  @Roles(Role.ADMIN)
  create(
    @TraceId() traceId: string | undefined,
    @Body() body: CreateAccountProviderBodyDto,
  ) {
    const payload: CreateAccountProviderCommand.Request = body;

    return this.amqpConnection.request<CreateAccountProviderCommand.Response>({
      exchange: CreateAccountProviderCommand.exchange,
      routingKey: CreateAccountProviderCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Delete('/:key')
  @Roles(Role.ADMIN)
  delete(
    @TraceId() traceId: string | undefined,
    @Param('key', new IsEnumPipe(ProviderKey)) key: ProviderKey,
  ) {
    const payload: DeleteAccountProviderCommand.Request = {
      key,
    };

    return this.amqpConnection.request<DeleteAccountProviderCommand.Response>({
      exchange: DeleteAccountProviderCommand.exchange,
      routingKey: DeleteAccountProviderCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
