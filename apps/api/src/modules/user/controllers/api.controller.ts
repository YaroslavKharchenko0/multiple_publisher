import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch } from "@nestjs/common";
import { FindUserByIdQuery, UpdateUserCommand, DeleteUserCommand } from '@app/contracts'
import { TraceId } from "@app/logger";
import { IsStringNumberPipe, JWTUser, Roles, User } from "@app/utils";
import { UpdateUserBodyDto } from "@app/validation";
import { Role } from "@app/types";

@Controller('users')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:id')
  @Roles(Role.USER)
  findUserById(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @User() user: JWTUser) {
    const payload: FindUserByIdQuery.Request = {
      id: Number(id)
    }

    if (user.isUser() && !user.isMe(Number(id))) {
      throw new ForbiddenException()
    }

    return this.amqpConnection.request<FindUserByIdQuery.Response>({
      exchange: FindUserByIdQuery.exchange,
      routingKey: FindUserByIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Patch('/:id')
  @Roles(Role.USER)
  updateUser(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @User() user: JWTUser, @Body() body: UpdateUserBodyDto) {
    const payload: UpdateUserCommand.Request = {
      ...body,
      userId: Number(id),
    }

    if (user.isUser() && !user.isMe(Number(id))) {
      throw new ForbiddenException()
    }

    return this.amqpConnection.request<UpdateUserCommand.Response>({
      exchange: UpdateUserCommand.exchange,
      routingKey: UpdateUserCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }

  @Delete('/:id')
  @Roles(Role.USER)
  deleteUser(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @User() user: JWTUser) {
    const numberId = Number(id)

    const payload: DeleteUserCommand.Request = {
      id: numberId
    }

    if (user.isUser() && !user.isMe(numberId)) {
      throw new ForbiddenException()
    }

    return this.amqpConnection.request<DeleteUserCommand.Response>({
      exchange: DeleteUserCommand.exchange,
      routingKey: DeleteUserCommand.routingKey,
      payload,
      headers: {
        traceId
      }
    });
  }
}
