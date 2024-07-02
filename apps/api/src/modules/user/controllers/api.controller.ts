import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Controller, Delete, ForbiddenException, Get, Param, Patch } from "@nestjs/common";
import { FindUserByIdQuery } from '@app/contracts'
import { TraceId } from "@app/logger";
import { Auth, IsStringNumberPipe, JWTUser, User } from "@app/utils";

@Controller('users')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:id')
  @Auth()
  findUserById(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @User() user: JWTUser) {
    const payload: FindUserByIdQuery.Request = {
      id: Number(id)
    }

    if (user.isUser() && !user.isMe(id)) {
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

  // TODO
  @Patch('/:id')
  @Auth()
  updateUser() {

  }

  // TODO
  @Delete('/:id')
  @Auth()
  deleteUser() {

  }
}
