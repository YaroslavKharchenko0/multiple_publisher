import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreatePostFilesCommand,
  createSuccessResponse,
  DeletePostFilesCommand,
} from '@app/contracts';
import { POST_FILE_SERVICE } from '../providers/post-file.providers';
import { PostFileService } from '../services/post-file.service';

@Controller()
export class CommandController {
  constructor(
    @Inject(POST_FILE_SERVICE) private readonly service: PostFileService,
  ) { }

  @RabbitRPC({
    exchange: CreatePostFilesCommand.exchange,
    routingKey: CreatePostFilesCommand.routingKey,
    queue: CreatePostFilesCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreatePostFilesCommand.Request,
  ): Promise<CreatePostFilesCommand.Response> {
    const payload = await this.service.createPostFiles(
      message.postId,
      message.files,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeletePostFilesCommand.exchange,
    routingKey: DeletePostFilesCommand.routingKey,
    queue: DeletePostFilesCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeletePostFilesCommand.Request,
  ): Promise<DeletePostFilesCommand.Response> {
    const payload = await this.service.deletePostFiles(message.postId);

    return createSuccessResponse(payload);
  }
}
