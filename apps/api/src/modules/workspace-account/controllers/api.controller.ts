import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Param } from '@nestjs/common';
import { FindWorkspaceAccountsQuery } from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  IsStringNumberPipe,
  ModuleRoute,
  Roles,
  Route,
  WorkspaceRoles,
} from '@app/utils';
import { Role, WorkspaceRole } from '@app/types';

export const moduleName = 'workspaceAccounts';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findWorkspaceAccounts')
  @Roles(Role.USER)
  @WorkspaceRoles(
    WorkspaceRole.ADMIN,
    WorkspaceRole.EDITOR,
    WorkspaceRole.VIEWER,
  )
  findWorkspaceAccounts(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) id: string,
  ) {
    const payload: FindWorkspaceAccountsQuery.Request = {
      workspaceId: Number(id),
    };

    return this.amqpConnection.request<FindWorkspaceAccountsQuery.Response>({
      exchange: FindWorkspaceAccountsQuery.exchange,
      routingKey: FindWorkspaceAccountsQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
