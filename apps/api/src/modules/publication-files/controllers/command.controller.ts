import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreatePublicationFilesCommand,
  createSuccessResponse,
  DeletePublicationFilesCommand,
} from '@app/contracts';
import { POST_FILE_SERVICE } from '../providers/publication-file.providers';
import { PublicationFileService } from '../services/publication-file.service';
import { TraceId } from '@app/logger';

@Controller()
export class CommandController {
  constructor(
    @Inject(POST_FILE_SERVICE) private readonly service: PublicationFileService,
  ) { }

  @RabbitRPC({
    exchange: CreatePublicationFilesCommand.exchange,
    routingKey: CreatePublicationFilesCommand.routingKey,
    queue: CreatePublicationFilesCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreatePublicationFilesCommand.Request,
  ): Promise<CreatePublicationFilesCommand.Response> {
    const payload = await this.service.createPublicationFiles(
      message.postId,
      message.files,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeletePublicationFilesCommand.exchange,
    routingKey: DeletePublicationFilesCommand.routingKey,
    queue: DeletePublicationFilesCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeletePublicationFilesCommand.Request,
    @TraceId() traceId: string | undefined,
  ): Promise<DeletePublicationFilesCommand.Response> {
    const payload = await this.service.deletePublicationFiles(message.postId, {
      traceId,
    });

    return createSuccessResponse(payload);
  }
}
