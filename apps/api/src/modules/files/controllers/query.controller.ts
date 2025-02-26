import {
  createSuccessResponse,
  FindFileByIdQuery,
  FindFileByProviderIdQuery,
  FindUserFilesQuery,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { FILE_SERVICE } from '../providers/file.providers';
import { FileService } from '../services/files.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(FILE_SERVICE) private readonly fileService: FileService,
  ) { }

  @RabbitRPC({
    exchange: FindFileByIdQuery.exchange,
    routingKey: FindFileByIdQuery.routingKey,
    queue: FindFileByIdQuery.queue,
  })
  async findById(
    @RabbitPayload() message: FindFileByIdQuery.Request,
  ): Promise<FindFileByIdQuery.Response> {
    const payload = await this.fileService.findById(message.id);

    return createSuccessResponse(payload.toFile());
  }

  @RabbitRPC({
    exchange: FindFileByProviderIdQuery.exchange,
    routingKey: FindFileByProviderIdQuery.routingKey,
    queue: FindFileByProviderIdQuery.queue,
  })
  async findByProviderId(
    @RabbitPayload() message: FindFileByProviderIdQuery.Request,
  ): Promise<FindFileByProviderIdQuery.Response> {
    const payload = await this.fileService.findByProviderId(message.providerId);

    return createSuccessResponse(payload.toFile());
  }

  @RabbitRPC({
    exchange: FindUserFilesQuery.exchange,
    routingKey: FindUserFilesQuery.routingKey,
    queue: FindUserFilesQuery.queue,
  })
  async findUserFiles(
    @RabbitPayload() message: FindUserFilesQuery.Request,
  ): Promise<FindUserFilesQuery.Response> {
    const payload = await this.fileService.findUserFiles(
      message.userId,
      message.pagination,
    );

    const files = payload.map((file) => file.toFile());

    return createSuccessResponse(files);
  }
}
