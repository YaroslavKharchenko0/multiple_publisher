import { FindUserByIdQuery, SuccessResponse } from "@app/contracts";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFacade {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async findUserById(id: number, traceId: string) {
    const payload: FindUserByIdQuery.Request = {
      id,
    }

    const response = await this.amqpConnection.request<FindUserByIdQuery.Response>({
      exchange: FindUserByIdQuery.exchange,
      routingKey: FindUserByIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    })

    if (response.isError) {
      return null;
    }

    const successResponse = response as SuccessResponse<FindUserByIdQuery.ResponsePayload>;

    return successResponse.payload;
  }
}
