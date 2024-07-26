import {
  CreatePublicationFilesCommand,
  DeletePublicationCommand,
  FindPublicationByIdQuery,
  FindPublicationFilesQuery,
  SuccessResponse,
} from '@app/contracts';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

interface Options {
  traceId?: string;
}

@Injectable()
export class PublicationFacade {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  async createPublicationFiles(
    payload: CreatePublicationFilesCommand.Request,
    traceId?: string,
  ): Promise<void> {
    await this.amqpConnection.request({
      exchange: CreatePublicationFilesCommand.exchange,
      routingKey: CreatePublicationFilesCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  async findPublicationFiles(publicationId: number, traceId?: string) {
    const payload: FindPublicationFilesQuery.Request = {
      publicationId,
    };

    const publicationResponse =
      await this.amqpConnection.request<FindPublicationFilesQuery.Response>({
        exchange: FindPublicationFilesQuery.exchange,
        routingKey: FindPublicationFilesQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      });

    if (publicationResponse.isError) {
      return null;
    }

    const successResponse =
      publicationResponse as SuccessResponse<FindPublicationFilesQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async findPublicationById(id: number, traceId?: string) {
    const payload: FindPublicationByIdQuery.Request = {
      id,
    };

    const publicationResponse =
      await this.amqpConnection.request<FindPublicationByIdQuery.Response>({
        exchange: FindPublicationByIdQuery.exchange,
        routingKey: FindPublicationByIdQuery.routingKey,
        payload,
        headers: {
          traceId,
        },
      });

    if (publicationResponse.isError) {
      return null;
    }

    const successResponse =
      publicationResponse as SuccessResponse<FindPublicationByIdQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async deletePublicationById(
    publicationId: number,
    postId: number,
    options?: Options,
  ): Promise<void> {
    const payload: DeletePublicationCommand.Request = {
      id: publicationId,
      postId,
    };

    await this.amqpConnection.request<DeletePublicationCommand.Response>({
      exchange: DeletePublicationCommand.exchange,
      routingKey: DeletePublicationCommand.routingKey,
      payload,
      headers: {
        traceId: options?.traceId,
      },
    });
  }
}
