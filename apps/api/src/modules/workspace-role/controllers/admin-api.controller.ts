import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TraceId } from '@app/logger';
import { IsEnumPipe, Roles } from '@app/utils';
import { Role, WorkspaceRole } from '@app/types';
import {
  CreateWorkspaceRoleCommand,
  DeleteWorkspaceRoleCommand,
  FindWorkspaceRoleQuery,
} from '@app/contracts';
import { CreateWorkspaceRoleDto } from '@app/dtos';

@Controller('admin/workspace-roles')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:role')
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

  @Post('/')
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

  @Delete('/:role')
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
