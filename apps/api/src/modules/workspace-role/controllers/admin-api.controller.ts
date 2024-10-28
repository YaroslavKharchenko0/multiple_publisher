import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param } from '@nestjs/common';
import { TraceId } from '@app/logger';
import { IsEnumPipe, ModuleRoute, Roles, Route } from '@app/utils';
import { Role, WorkspaceRole } from '@app/types';
import {
  CreateWorkspaceRoleCommand,
  DeleteWorkspaceRoleCommand,
  FindWorkspaceRoleQuery,
} from '@app/contracts';
import { CreateWorkspaceRoleDto } from '@app/dtos';

export const moduleName = 'adminRoleWorkspace';

@ModuleRoute(moduleName)
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findByRole')
  @Roles(Role.ADMIN)
  findByRole(
    @TraceId() traceId: string | undefined,
    @Param('role', new IsEnumPipe(WorkspaceRole)) role: WorkspaceRole,
  ) {
    const payload: FindWorkspaceRoleQuery.Request = {
      role,
    };

    return this.amqpConnection.request<FindWorkspaceRoleQuery.Response>({
      exchange: FindWorkspaceRoleQuery.exchange,
      routingKey: FindWorkspaceRoleQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'createRole')
  @Roles(Role.ADMIN)
  createRole(
    @TraceId() traceId: string | undefined,
    @Body() body: CreateWorkspaceRoleDto,
  ) {
    const payload: CreateWorkspaceRoleCommand.Request = body;

    return this.amqpConnection.request<CreateWorkspaceRoleCommand.Response>({
      exchange: CreateWorkspaceRoleCommand.exchange,
      routingKey: CreateWorkspaceRoleCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'deleteRole')
  @Roles(Role.ADMIN)
  deleteRole(
    @TraceId() traceId: string | undefined,
    @Param('role', new IsEnumPipe(WorkspaceRole)) role: WorkspaceRole,
  ) {
    const payload: DeleteWorkspaceRoleCommand.Request = {
      role,
    };

    return this.amqpConnection.request<DeleteWorkspaceRoleCommand.Response>({
      exchange: DeleteWorkspaceRoleCommand.exchange,
      routingKey: DeleteWorkspaceRoleCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
