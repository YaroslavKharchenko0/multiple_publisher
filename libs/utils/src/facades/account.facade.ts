import { FindAccountProviderQuery, SuccessResponse } from "@app/contracts";
import { ProviderKey } from "@app/types";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountFacade {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  async findByKey(key: ProviderKey) {
    const payload: FindAccountProviderQuery.Request = {
      key,
    }

    const accountResponse = await this.amqpConnection.request<FindAccountProviderQuery.Response>({
      exchange: FindAccountProviderQuery.exchange,
      routingKey: FindAccountProviderQuery.routingKey,
      payload,
    })

    if (accountResponse.isError) {
      return null;
    }

    const successResponse = accountResponse as SuccessResponse<FindAccountProviderQuery.ResponsePayload>;

    return successResponse.payload;
  }
}
