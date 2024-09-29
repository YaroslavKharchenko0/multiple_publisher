import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param, Query } from '@nestjs/common';
import {
  DeleteAccountCommand,
  FindAccountQuery,
  GoogleCallbackCommand,
  GoogleSingInUrlCommand,
  UpdateAccountCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  AccountAccess,
  IsStringNumberPipe,
  JWTUser,
  ModuleRoute,
  Route,
  Roles,
  User,
} from '@app/utils';
import { UpdateAccountBodyDto } from '@app/dtos';
import { Role } from '@app/types';
import {
  DeleteAccountDocs,
  FindAccountDocs,
  GoogleAuthUrlDocs,
  GoogleCallbackDocs,
  UpdateAccountDocs,
} from '@app/docs';

const moduleName = 'account';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'googleAuthUrl')
  @Roles(Role.ADMIN, Role.USER)
  @GoogleAuthUrlDocs()
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

  @Route(moduleName, 'googleCallback')
  @GoogleCallbackDocs()
  async googleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @TraceId() traceId: string | undefined,
  ) {
    const payload: GoogleCallbackCommand.Request = {
      code,
      state,
    };

    return this.amqpConnection.request<GoogleCallbackCommand.Response>({
      exchange: GoogleCallbackCommand.exchange,
      routingKey: GoogleCallbackCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'delete')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  @DeleteAccountDocs()
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

  @Route(moduleName, 'findOne')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  @FindAccountDocs()
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

  @Route(moduleName, 'update')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  @UpdateAccountDocs()
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
