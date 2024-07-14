import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteAccountTokensCommand } from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, Roles } from '@app/utils';
import { Role } from '@app/types';

@Controller('accounts/:accountId/tokens')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Delete('/')
  @Roles(Role.ADMIN, Role.USER)
  command(
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
