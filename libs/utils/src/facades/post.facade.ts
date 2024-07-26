import {
  DeletePostCommand,
  FindPostByIdQuery,
  FindPostFilesQuery,
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

  async findPostFiles(postId: number, traceId?: string) {
    const payload: FindPostFilesQuery.Request = {
      postId,
    };

    const postResponse =
      await this.amqpConnection.request<FindPostFilesQuery.Response>({
        exchange: FindPostFilesQuery.exchange,
        routingKey: FindPostFilesQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      });

    if (postResponse.isError) {
      return null;
    }

    const successResponse =
      postResponse as SuccessResponse<FindPostFilesQuery.ResponsePayload>;

    return successResponse.payload;
  }

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
