import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Param } from '@nestjs/common';
import { DeleteAccountTokensCommand } from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  AccountAccess,
  IsStringNumberPipe,
  ModuleRoute,
  Roles,
  Route,
} from '@app/utils';
import { Role } from '@app/types';

export const moduleName = 'accountToken';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'delete')
  @Roles(Role.ADMIN, Role.USER)
  @AccountAccess()
  delete(
    @TraceId() traceId: string | undefined,
    @Param('accountId', IsStringNumberPipe) accountId: string,
  ) {
    const payload: DeleteAccountTokensCommand.Request = {
      accountId: Number(accountId),
    };

    return this.amqpConnection.request<DeleteAccountTokensCommand.Response>({
      exchange: DeleteAccountTokensCommand.exchange,
      routingKey: DeleteAccountTokensCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
