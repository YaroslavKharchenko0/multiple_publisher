import { FindAccountQuery, QueryQuery, createSuccessResponse } from '@app/contracts';
import { internalServerError } from '@app/errors';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { ACCOUNT_SERVICE } from '../providers/account.providers';
import { AccountService } from '../services/account.service';

@Controller()
export class QueryController {
  constructor(@Inject(ACCOUNT_SERVICE) private readonly service: AccountService) { }

  @RabbitRPC({
    exchange: FindAccountQuery.exchange,
    routingKey: FindAccountQuery.routingKey,
    queue: FindAccountQuery.queue,
  })
  async findOne(@RabbitPayload() message: FindAccountQuery.Request): Promise<FindAccountQuery.Response> {
    const payload = await this.service.findAccountById(message.id);

    return createSuccessResponse(payload);
  }
}
