import { CreateFileMetadataCommand, FindFileByIdQuery, FindFileByProviderIdQuery, SuccessResponse } from "@app/contracts";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileFacade {
  constructor(
    private readonly amqpConnection: AmqpConnection
  ) { }


  async addMetadata(fileId: number, metadata: Record<string, string>, traceId: string) {
    const entries = Object.entries(metadata);

    const promises = entries.map(([key, value]) => {
      if (!value) {
        return Promise.resolve(null);
      }

      const payload: CreateFileMetadataCommand.Request = {
        fileId,
        key,
        value,
      }

      return this.amqpConnection.request<CreateFileMetadataCommand.Response>({
        exchange: CreateFileMetadataCommand.exchange,
        routingKey: CreateFileMetadataCommand.routingKey,
        payload,
        headers: {
          traceId
        }
      })
    });

    const responses = await Promise.all(promises);

    const payloads = responses.map(response => {
      const successResponse = response as SuccessResponse<CreateFileMetadataCommand.ResponsePayload>;

      return successResponse.payload;
    })

    return payloads
  }

  async findById(id: number, traceId: string) {
    const payload: FindFileByIdQuery.Request = {
      id,
    }

    const fileResponse = await this.amqpConnection.request<FindFileByIdQuery.Response>({
      exchange: FindFileByIdQuery.exchange,
      routingKey: FindFileByIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    })

    if (fileResponse.isError) {
      return null;
    }

    const successResponse = fileResponse as SuccessResponse<FindFileByIdQuery.ResponsePayload>;

    return successResponse.payload;
  }

  async findByProviderId(id: string, traceId: string) {
    const payload: FindFileByProviderIdQuery.Request = {
      providerId: id,
    }

    const fileResponse = await this.amqpConnection.request<FindFileByProviderIdQuery.Response>({
      exchange: FindFileByProviderIdQuery.exchange,
      routingKey: FindFileByProviderIdQuery.routingKey,
      payload,
      headers: {
        traceId
      }
    })

    if (fileResponse.isError) {
      return null;
    }

    const successResponse = fileResponse as SuccessResponse<FindFileByProviderIdQuery.ResponsePayload>;

    return successResponse.payload;
  }
}
