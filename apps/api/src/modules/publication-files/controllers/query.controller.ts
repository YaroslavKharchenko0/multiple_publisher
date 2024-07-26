import { FindPublicationFilesQuery, createSuccessResponse } from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { POST_FILE_SERVICE } from '../providers/publication-file.providers';
import { PublicationFileService } from '../services/publication-file.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(POST_FILE_SERVICE) private readonly service: PublicationFileService,
  ) { }

  @RabbitRPC({
    exchange: FindPublicationFilesQuery.exchange,
    routingKey: FindPublicationFilesQuery.routingKey,
    queue: FindPublicationFilesQuery.queue,
  })
  async create(
    @RabbitPayload() message: FindPublicationFilesQuery.Request,
  ): Promise<FindPublicationFilesQuery.Response> {
    const payload = await this.service.findPublicationFiles(message.postId);

    return createSuccessResponse(payload);
  }
}
