import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateWorkspaceUserCommand,
  DeleteWorkspaceUserCommand,
  FindWorkspaceUserQuery,
  FindWorkspaceUsersQuery,
  UpdateWorkspaceUserCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  IsStringNumberPipe,
  JWTUser,
  ModuleRoute,
  Roles,
  Route,
  User,
  WorkspaceRoles,
} from '@app/utils';
import { Role, WorkspaceRole } from '@app/types';
import { CreateWorkspaceUserDto, UpdateWorkspaceUserDto } from '@app/dtos';

export const moduleName = 'workspaceUser';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'createWorkspaceUser')
  @Roles(Role.USER)
  @WorkspaceRoles(WorkspaceRole.ADMIN)
  createWorkspaceUser(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) workspaceId: string,
    @Body() body: CreateWorkspaceUserDto,
    @User() user: JWTUser,
  ) {
    const payload: CreateWorkspaceUserCommand.Request = {
      ...body,
      workspaceId: Number(workspaceId),
      userId: user.app_id,
    };

    return this.amqpConnection.request<CreateWorkspaceUserCommand.Response>({
      exchange: CreateWorkspaceUserCommand.exchange,
      routingKey: CreateWorkspaceUserCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'deleteWorkspaceUser')
  @Roles(Role.USER)
  @WorkspaceRoles(WorkspaceRole.ADMIN)
  deleteWorkspaceUser(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) workspaceId: string,
    @Param('userId', IsStringNumberPipe) userId: string,
  ) {
    const payload: DeleteWorkspaceUserCommand.Request = {
      workspaceId: Number(workspaceId),
      userId: Number(userId),
    };

    return this.amqpConnection.request<DeleteWorkspaceUserCommand.Response>({
      exchange: DeleteWorkspaceUserCommand.exchange,
      routingKey: DeleteWorkspaceUserCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'updateWorkspaceUser')
  @Roles(Role.USER)
  @WorkspaceRoles(WorkspaceRole.ADMIN)
  updateWorkspaceUser(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) workspaceId: string,
    @Param('userId', IsStringNumberPipe) userId: string,
    @Body() body: UpdateWorkspaceUserDto,
  ) {
    const payload: UpdateWorkspaceUserCommand.Request = {
      workspaceId: Number(workspaceId),
      userId: Number(userId),
      ...body,
    };

    return this.amqpConnection.request<UpdateWorkspaceUserCommand.Response>({
      exchange: UpdateWorkspaceUserCommand.exchange,
      routingKey: UpdateWorkspaceUserCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findWorkspaceUser')
  @Roles(Role.USER)
  @WorkspaceRoles(
    WorkspaceRole.ADMIN,
    WorkspaceRole.EDITOR,
    WorkspaceRole.VIEWER,
  )
  findWorkspaceUser(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) workspaceId: string,
    @Param('userId', IsStringNumberPipe) userId: string,
  ) {
    const payload: FindWorkspaceUserQuery.Request = {
      workspaceId: Number(workspaceId),
      userId: Number(userId),
    };

    return this.amqpConnection.request<FindWorkspaceUserQuery.Response>({
      exchange: FindWorkspaceUserQuery.exchange,
      routingKey: FindWorkspaceUserQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findWorkspaceUsers')
  @Roles(Role.USER)
  @WorkspaceRoles(
    WorkspaceRole.ADMIN,
    WorkspaceRole.EDITOR,
    WorkspaceRole.VIEWER,
  )
  findWorkspaceUsers(
    @TraceId() traceId: string | undefined,
    @Param('workspaceId', IsStringNumberPipe) workspaceId: string,
  ) {
    const payload: FindWorkspaceUsersQuery.Request = {
      workspaceId: Number(workspaceId),
    };

    return this.amqpConnection.request<FindWorkspaceUsersQuery.Response>({
      exchange: FindWorkspaceUsersQuery.exchange,
      routingKey: FindWorkspaceUsersQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
