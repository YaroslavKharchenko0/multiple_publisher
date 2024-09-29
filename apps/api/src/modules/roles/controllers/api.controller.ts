import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Param, Query } from '@nestjs/common';
import { TraceId } from '@app/logger';
import { FindRoleQuery, FindRolesQuery } from '@app/contracts';
import { FindRolesBodyDto } from '@app/dtos';
import { Role } from '@app/types';
import { IsEnumPipe, ModuleRoute, Roles, Route } from '@app/utils';

export const moduleName = 'roles';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findRole')
  @Roles(Role.USER)
  findRole(
    @TraceId() traceId: string | undefined,
    @Param('role', new IsEnumPipe(Role)) role: Role,
  ) {
    const payload: FindRoleQuery.Request = { role };

    return this.amqpConnection.request<FindRoleQuery.Response>({
      exchange: FindRoleQuery.exchange,
      routingKey: FindRoleQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findRoles')
  @Roles(Role.USER)
  findRoles(
    @TraceId() traceId: string | undefined,
    @Query() query: FindRolesBodyDto,
  ) {
    const payload: FindRolesQuery.Request = query;

    return this.amqpConnection.request<FindRolesQuery.Response>({
      exchange: FindRolesQuery.exchange,
      routingKey: FindRolesQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
