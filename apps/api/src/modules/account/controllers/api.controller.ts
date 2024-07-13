import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  CommandErrorCommand,
  DeleteAccountCommand,
  EventEvent,
  FindAccountQuery,
  QueryQuery,
  UpdateAccountCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { Auth, IsStringNumberPipe, Roles } from '@app/utils';
import { Role } from '@app/types';
import { UpdateAccountBodyDto } from '@app/validation';

@Controller('accounts')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Delete('/:accountId')
  delete(@TraceId() traceId: string | undefined, @Param('accountId', IsStringNumberPipe) accountId: string) {
    const payload: DeleteAccountCommand.Request = {
      id: Number(accountId),
    };

    return this.amqpConnection.request<DeleteAccountCommand.Response>({
      exchange: DeleteAccountCommand.exchange,
      routingKey: DeleteAccountCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/:accountId')
  findOne(@TraceId() traceId: string | undefined, @Param('accountId', IsStringNumberPipe) accountId: string) {
    const payload: FindAccountQuery.Request = {
      id: Number(accountId),
    };

    return this.amqpConnection.request<FindAccountQuery.Response>({
      exchange: FindAccountQuery.exchange,
      routingKey: FindAccountQuery.routingKey,
      payload,
      headers: {
        traceId,
      }
    });
  }

  @Patch('/:accountId')
  update(@TraceId() traceId: string | undefined, @Param('accountId', IsStringNumberPipe) accountId: string, @Body() body: UpdateAccountBodyDto) {
    const payload: UpdateAccountCommand.Request = {
      id: Number(accountId),
      payload: body,
    };

    return this.amqpConnection.request<UpdateAccountCommand.Response>({
      exchange: UpdateAccountCommand.exchange,
      routingKey: UpdateAccountCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
