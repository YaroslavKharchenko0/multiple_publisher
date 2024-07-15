import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  DeleteAccountCommand,
  FindAccountQuery,
  GoogleCallbackEvent,
  GoogleSingInUrlCommand,
  UpdateAccountCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  AccountAccess,
  IsStringNumberPipe,
  JWTUser,
  Roles,
  User,
} from '@app/utils';
import { UpdateAccountBodyDto } from '@app/validation';
import { Role } from '@app/types';

@Controller('accounts')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get('/auth/google/url')
  @Roles(Role.ADMIN, Role.USER)
  googleAuthUrl(@TraceId() traceId: string | undefined, @User() user: JWTUser) {
    const payload: GoogleSingInUrlCommand.Request = {
      userId: user.app_id,
    };

    return this.amqpConnection.request<string>({
      exchange: GoogleSingInUrlCommand.exchange,
      routingKey: GoogleSingInUrlCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/auth/google/callback')
  async googleCallback(
    @Query('code', IsStringNumberPipe) code: string,
    @Query('state', IsStringNumberPipe) state: string,
  ) {
    await this.amqpConnection.publish<GoogleCallbackEvent.Request>(
      GoogleCallbackEvent.exchange,
      GoogleCallbackEvent.routingKey,
      {
        code,
        userId: Number(state),
      },
    );
  }

  @Delete('/:accountId')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  delete(
    @TraceId() traceId: string | undefined,
    @Param('accountId', IsStringNumberPipe) accountId: string,
  ) {
    const payload: DeleteAccountCommand.Request = {
      id: Number(accountId),
    };

    return this.amqpConnection.request<DeleteAccountCommand.Response>({
      exchange: DeleteAccountCommand.exchange,
      routingKey: DeleteAccountCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Get('/:accountId')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  findOne(
    @TraceId() traceId: string | undefined,
    @Param('accountId', IsStringNumberPipe) accountId: string,
  ) {
    const payload: FindAccountQuery.Request = {
      id: Number(accountId),
    };

    return this.amqpConnection.request<FindAccountQuery.Response>({
      exchange: FindAccountQuery.exchange,
      routingKey: FindAccountQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Patch('/:accountId')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  update(
    @TraceId() traceId: string | undefined,
    @Param('accountId', IsStringNumberPipe) accountId: string,
    @Body() body: UpdateAccountBodyDto,
  ) {
    const payload: UpdateAccountCommand.Request = {
      id: Number(accountId),
      payload: body,
    };

    return this.amqpConnection.request<UpdateAccountCommand.Response>({
      exchange: UpdateAccountCommand.exchange,
      routingKey: UpdateAccountCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
