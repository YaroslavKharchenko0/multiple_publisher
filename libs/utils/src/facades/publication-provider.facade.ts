import {
  FindPublicationProviderByIdQuery,
  SuccessResponse,
} from '@app/contracts';
import { Options } from '@app/types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicationProviderFacade {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async findPublicationProviderById(id: number, options: Options) {
    const payload: FindPublicationProviderByIdQuery.Request = {
      id,
    };

    const publicationResponse =
      await this.amqpConnection.request<FindPublicationProviderByIdQuery.Response>(
        {
          exchange: FindPublicationProviderByIdQuery.exchange,
          routingKey: FindPublicationProviderByIdQuery.routingKey,
          payload,
          headers: {
            traceId: options?.traceId,
          },
        },
      );

    if (publicationResponse.isError) {
      return null;
    }

    const successResponse =
      publicationResponse as SuccessResponse<FindPublicationProviderByIdQuery.ResponsePayload>;

    return successResponse.payload;
  }
}
