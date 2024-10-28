import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Param } from '@nestjs/common';
import { FindUserRoleCommand } from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, ModuleRoute, Roles, Route } from '@app/utils';
import { Role } from '@app/types';

export const moduleName = 'userRole';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findUserRole')
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
