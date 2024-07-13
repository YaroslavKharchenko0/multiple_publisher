import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TraceId } from '@app/logger';
import {
  CreateRoleCommand,
  DeleteRoleCommand,
  FindRoleQuery,
  FindRolesQuery,
} from '@app/contracts';
import { CreateRoleBodyDto, FindRolesBodyDto } from '@app/validation';
import { Role } from '@app/types';
import { IsEnumPipe, Roles } from '@app/utils';

@Controller('admin/roles')
export class AdminApiController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post('/')
  @Roles(Role.ADMIN)
  createRole(
    @TraceId() traceId: string | undefined,
    @Body() body: CreateRoleBodyDto,
  ) {
    const payload: CreateRoleCommand.Request = body;

    return this.amqpConnection.request<CreateRoleCommand.Response>({
      exchange: CreateRoleCommand.exchange,
      routingKey: CreateRoleCommand.routingKey,
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
    @Param('role', new IsEnumPipe(Role)) role: Role,
  ) {
    const payload: DeleteRoleCommand.Request = { role };

    return this.amqpConnection.request<DeleteRoleCommand.Response>({
      exchange: DeleteRoleCommand.exchange,
      routingKey: DeleteRoleCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/:role')
  @Roles(Role.ADMIN)
  findRole(
    @TraceId() traceId: string | undefined,
    @Param('role', new IsEnumPipe(Role)) role: Role,
  ) {
    const payload: FindRoleQuery.Request = { role };

    return this.amqpConnection.request<FindRoleQuery.Response>({
      exchange: FindRoleQuery.exchange,
      routingKey: FindRoleQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/')
  @Roles(Role.ADMIN)
  findRoles(
    @TraceId() traceId: string | undefined,
    @Query() query: FindRolesBodyDto,
  ) {
    const payload: FindRolesQuery.Request = query;

    return this.amqpConnection.request<FindRolesQuery.Response>({
      exchange: FindRolesQuery.exchange,
      routingKey: FindRolesQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
