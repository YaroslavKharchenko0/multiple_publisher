import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Param } from '@nestjs/common';
import { FindUserRoleCommand } from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, Roles } from '@app/utils';
import { Role } from '@app/types';

@Controller('users/:userId/roles')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/')
  @Roles(Role.USER)
  findUserRole(
    @TraceId() traceId: string | undefined,
    @Param('userId', IsStringNumberPipe) userId: string,
  ) {
    const payload: FindUserRoleCommand.Request = {
      userId: Number(userId),
    };

    return this.amqpConnection.request<FindUserRoleCommand.Response>({
      exchange: FindUserRoleCommand.exchange,
      routingKey: FindUserRoleCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
