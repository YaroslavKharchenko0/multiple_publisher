import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { FindUserByIdQuery, UpdateUserCommand, DeleteUserCommand } from '@app/contracts'
import { TraceId } from "@app/logger";
import { IsStringNumberPipe, Roles } from "@app/utils";
import { UpdateUserBodyDto } from "@app/validation";
import { Role } from "@app/types";

@Controller('admin/users')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/:id')
  @Roles(Role.ADMIN)
  findUserById(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string) {
    const payload: FindUserByIdQuery.Request = {
      id: Number(id)
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
  @Roles(Role.ADMIN)
  updateUser(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string, @Body() body: UpdateUserBodyDto) {
    const payload: UpdateUserCommand.Request = {
      ...body,
      userId: Number(id),
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
  @Roles(Role.ADMIN)
  deleteUser(@TraceId() traceId: string | undefined, @Param('id', IsStringNumberPipe) id: string) {
    const numberId = Number(id)

    const payload: DeleteUserCommand.Request = {
      id: numberId
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
