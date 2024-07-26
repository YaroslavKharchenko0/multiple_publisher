import {
  FindPublicationFilesQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { PUBLICATION_FILE_SERVICE } from '../providers/publication-file.providers';
import { PublicationFileService } from '../services/publication-file.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(PUBLICATION_FILE_SERVICE)
    private readonly service: PublicationFileService,
  ) { }

  @RabbitRPC({
    exchange: FindPublicationFilesQuery.exchange,
    routingKey: FindPublicationFilesQuery.routingKey,
    queue: FindPublicationFilesQuery.queue,
  })
  async find(
    @RabbitPayload() message: FindPublicationFilesQuery.Request,
  ): Promise<FindPublicationFilesQuery.Response> {
    const payload = await this.service.findPublicationFiles(
      message.publicationId,
    );

    return createSuccessResponse(payload);
  }
}
