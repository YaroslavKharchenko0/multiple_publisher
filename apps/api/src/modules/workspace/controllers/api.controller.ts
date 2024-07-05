import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateWorkspaceCommand, DeleteWorkspaceCommand, FindByIdWorkspaceQuery } from '@app/contracts'
import { TraceId } from "@app/logger";
import { IsStringNumberPipe, JWTUser, Roles, User, WorkspaceRoles } from "@app/utils";
import { CreateWorkspaceBodyDto } from "@app/validation";
import { Role, WorkspaceRole } from "@app/types";

@Controller('workspaces')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:workspaceId')
  @Roles(Role.USER)
  @WorkspaceRoles(WorkspaceRole.ADMIN, WorkspaceRole.EDITOR, WorkspaceRole.VIEWER)
  findById(@TraceId() traceId: string | undefined, @Param('workspaceId', IsStringNumberPipe) id: string) {
    const payload: FindByIdWorkspaceQuery.Request = {
      id: Number(id)
    }

    return this.amqpConnection.request<FindByIdWorkspaceQuery.Response>({
      exchange: FindByIdWorkspaceQuery.exchange,
      routingKey: FindByIdWorkspaceQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Post('/')
  @Roles(Role.USER)
  createWorkspace(@TraceId() traceId: string | undefined, @Body() body: CreateWorkspaceBodyDto, @User() user: JWTUser) {
    const payload: CreateWorkspaceCommand.Request = {
      userId: user.app_id,
      name: body.name
    }

    return this.amqpConnection.request<CreateWorkspaceCommand.Response>({
      exchange: CreateWorkspaceCommand.exchange,
      routingKey: CreateWorkspaceCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Delete('/:workspaceId')
  @Roles(Role.USER)
  @WorkspaceRoles(WorkspaceRole.ADMIN)
  deleteWorkspace(@TraceId() traceId: string | undefined, @Param('workspaceId', IsStringNumberPipe) id: string) {
    const payload: DeleteWorkspaceCommand.Request = {
      id: Number(id)
    }

    return this.amqpConnection.request<DeleteWorkspaceCommand.Response>({
      exchange: DeleteWorkspaceCommand.exchange,
      routingKey: DeleteWorkspaceCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
