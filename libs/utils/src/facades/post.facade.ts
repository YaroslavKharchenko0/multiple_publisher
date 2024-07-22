import {
  DeletePostCommand,
  FindPostByIdQuery,
  SuccessResponse,
} from '@app/contracts';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

interface Options {
  traceId?: string;
}

@Injectable()
export class PostFacade {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async findPostById(id: number, traceId?: string) {
    const payload: FindPostByIdQuery.Request = {
      id,
    };

    const postResponse =
      await this.amqpConnection.request<FindPostByIdQuery.Response>({
        exchange: FindPostByIdQuery.exchange,
        routingKey: FindPostByIdQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      });

    if (postResponse.isError) {
      return null;
    }

    const successResponse =
      postResponse as SuccessResponse<FindPostByIdQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async deletePostById(postId: number, options?: Options): Promise<void> {
    const payload: DeletePostCommand.Request = {
      id: postId,
    };

    await this.amqpConnection.request<DeletePostCommand.Response>({
      exchange: DeletePostCommand.exchange,
      routingKey: DeletePostCommand.routingKey,
      payload,
      headers: {
        traceId: options?.traceId,
      },
    });
  }
}
