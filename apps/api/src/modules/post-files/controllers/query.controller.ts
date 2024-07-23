import { FindPostFilesQuery, createSuccessResponse } from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { POST_FILE_SERVICE } from '../providers/post-file.providers';
import { PostFileService } from '../services/post-file.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(POST_FILE_SERVICE) private readonly service: PostFileService,
  ) { }

  @RabbitRPC({
    exchange: FindPostFilesQuery.exchange,
    routingKey: FindPostFilesQuery.routingKey,
    queue: FindPostFilesQuery.queue,
  })
  async create(
    @RabbitPayload() message: FindPostFilesQuery.Request,
  ): Promise<FindPostFilesQuery.Response> {
    const payload = await this.service.findPostFiles(message.postId);

    return createSuccessResponse(payload);
  }
}
