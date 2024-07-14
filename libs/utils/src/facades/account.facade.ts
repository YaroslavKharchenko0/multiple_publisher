import { FindAccountProviderQuery, FindAccountQuery, SuccessResponse } from "@app/contracts";
import { ProviderKey } from "@app/types";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AccountFacade {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }

  async findAccountById(id: number, traceId?: string) {
    const payload: FindAccountQuery.Request = {
      id,
    }

    const accountResponse = await this.amqpConnection.request<FindAccountQuery.Response>({
      exchange: FindAccountQuery.exchange,
      routingKey: FindAccountQuery.routingKey,
      payload,
    })

    if (accountResponse.isError) {
      return null;
    }

    const successResponse = accountResponse as SuccessResponse<FindAccountQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async findByKey(key: ProviderKey, traceId?: string) {
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
