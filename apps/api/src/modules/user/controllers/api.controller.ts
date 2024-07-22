import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import {
  FindUserByIdQuery,
  UpdateUserCommand,
  DeleteUserCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, Roles, UserAccess } from '@app/utils';
import { UpdateUserBodyDto } from '@app/validation';
import { Role } from '@app/types';

@Controller('users')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/:userId')
  @Roles(Role.USER)
  @UserAccess()
  findUserById(
    @TraceId() traceId: string | undefined,
    @Param('userId', IsStringNumberPipe) id: string,
  ) {
    const payload: FindUserByIdQuery.Request = {
      id: Number(id),
    };

    return this.amqpConnection.request<FindUserByIdQuery.Response>({
      exchange: FindUserByIdQuery.exchange,
      routingKey: FindUserByIdQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Patch('/:userId')
  @Roles(Role.USER)
  @UserAccess()
  updateUser(
    @TraceId() traceId: string | undefined,
    @Param('userId', IsStringNumberPipe) id: string,
    @Body() body: UpdateUserBodyDto,
  ) {
    const payload: UpdateUserCommand.Request = {
      ...body,
      userId: Number(id),
    };

    return this.amqpConnection.request<UpdateUserCommand.Response>({
      exchange: UpdateUserCommand.exchange,
      routingKey: UpdateUserCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Delete('/:userId')
  @Roles(Role.USER)
  @UserAccess()
  deleteUser(
    @TraceId() traceId: string | undefined,
    @Param('userId', IsStringNumberPipe) id: string,
  ) {
    const numberId = Number(id);

    const payload: DeleteUserCommand.Request = {
      id: numberId,
    };

    return this.amqpConnection.request<DeleteUserCommand.Response>({
      exchange: DeleteUserCommand.exchange,
      routingKey: DeleteUserCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
