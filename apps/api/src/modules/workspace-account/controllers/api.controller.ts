import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param, Query } from '@nestjs/common';
import {
  CreateWorkspaceAccountCommand,
  FindWorkspaceAccountsQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  IsStringNumberPipe,
  ModuleRoute,
  Roles,
  Route,
  WorkspaceRoles,
} from '@app/utils';
import { Role, WorkspaceRole } from '@app/types';
import { CreateWorkspaceAccountBodyDto, PaginationDto } from '@app/dtos';

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
    @Query() pagination: PaginationDto,
  ) {
    const payload: FindWorkspaceAccountsQuery.Request = {
      workspaceId: Number(id),
      pagination,
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

  @Route(moduleName, 'createWorkspaceAccount')
  @Roles(Role.USER)
  @WorkspaceRoles(WorkspaceRole.ADMIN, WorkspaceRole.EDITOR)
  createWorkspaceAccount(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) id: string,
    @Body() body: CreateWorkspaceAccountBodyDto,
  ) {
    const payload: CreateWorkspaceAccountCommand.Request = {
      workspaceId: Number(id),
      accountId: body.accountId,
    };

    return this.amqpConnection.request<CreateWorkspaceAccountCommand.Response>({
      exchange: CreateWorkspaceAccountCommand.exchange,
      routingKey: CreateWorkspaceAccountCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
