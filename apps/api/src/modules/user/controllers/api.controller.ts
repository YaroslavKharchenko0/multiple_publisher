import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch } from "@nestjs/common";
import { FindUserByIdQuery, UpdateUserCommand } from '@app/contracts'
import { TraceId } from "@app/logger";
import { Auth, IsStringNumberPipe, JWTUser, User } from "@app/utils";
import { UpdateUserBodyDto } from "@app/validation";

@Controller('users')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:id')
  @Auth()
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
  @Auth()
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

  // TODO
  @Delete('/:id')
  @Auth()
  deleteUser() {

  }
}
