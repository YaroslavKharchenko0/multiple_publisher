import {
  FindFileMetadataByFileIdQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { FileMetadataService } from '../services/file-metadata.service';
import { FILE_METADATA_SERVICE } from '../providers/file-metadata.poviders';

@Controller()
export class QueryController {
  constructor(
    @Inject(FILE_METADATA_SERVICE)
    private readonly service: FileMetadataService,
  ) {}

  @RabbitRPC({
    exchange: FindFileMetadataByFileIdQuery.exchange,
    routingKey: FindFileMetadataByFileIdQuery.routingKey,
    queue: FindFileMetadataByFileIdQuery.queue,
  })
  async findByFileId(
    @RabbitPayload() message: FindFileMetadataByFileIdQuery.Request,
  ): Promise<FindFileMetadataByFileIdQuery.Response> {
    const payload = await this.service.findByFileId(
      message.fileId,
      message.pagination,
    );

    return createSuccessResponse(payload);
  }
}
