import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserRoleCommand, DeleteUserRoleCommand, FindUserRoleCommand, UpdateUserRoleCommand } from '@app/contracts'
import { TraceId } from "@app/logger";
import { CreateUserRoleBodyDto, UpdateUserRoleBodyDto } from "@app/validation";
import { IsStringNumberPipe, Roles } from "@app/utils";
import { Role } from "@app/types";

@Controller('admin/users/:userId/roles')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Post('/')
  @Roles(Role.ADMIN)
  createUserRole(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) userId: string, @Body() body: CreateUserRoleBodyDto) {
    const payload: CreateUserRoleCommand.Request = {
      ...body,
      userId: Number(userId)
    }

    return this.amqpConnection.request<CreateUserRoleCommand.Response>({
      exchange: CreateUserRoleCommand.exchange,
      routingKey: CreateUserRoleCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Get('/')
  @Roles(Role.ADMIN)
  findUserRole(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) userId: string) {
    const payload: FindUserRoleCommand.Request = {
      userId: Number(userId)
    }

    return this.amqpConnection.request<FindUserRoleCommand.Response>({
      exchange: FindUserRoleCommand.exchange,
      routingKey: FindUserRoleCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    })
  }

  @Delete('/')
  @Roles(Role.ADMIN)
  deleteUserRole(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) userId: string) {
    const payload: DeleteUserRoleCommand.Request = {
      userId: Number(userId)
    }

    return this.amqpConnection.request<DeleteUserRoleCommand.Response>({
      exchange: DeleteUserRoleCommand.exchange,
      routingKey: DeleteUserRoleCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Patch('/')
  @Roles(Role.ADMIN)
  updateUserRole(@TraceId() traceId: string | undefined, @Param('userId', IsStringNumberPipe) userId: string, @Body() body: UpdateUserRoleBodyDto) {
    const payload: UpdateUserRoleCommand.Request = {
      userId: Number(userId),
      ...body,
    }

    return this.amqpConnection.request<UpdateUserRoleCommand.Response>({
      exchange: UpdateUserRoleCommand.exchange,
      routingKey: UpdateUserRoleCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
