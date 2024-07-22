import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import {
  CreatePostCommand,
  createSuccessResponse,
  DeletePostCommand,
  UpdatePostCommand,
} from '@app/contracts';
import { POST_SERVICE } from '../providers/posts.providers';
import { PostService } from '../services/post.service';

@Controller()
export class CommandController {
  constructor(
    @Inject(POST_SERVICE) private readonly postService: PostService,
  ) { }

  @RabbitRPC({
    exchange: CreatePostCommand.exchange,
    routingKey: CreatePostCommand.routingKey,
    queue: CreatePostCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreatePostCommand.Request,
  ): Promise<CreatePostCommand.Response> {
    const payload = await this.postService.createPost({
      title: message.title,
      description: message.description,
      userId: message.userId,
      type: message.type,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdatePostCommand.exchange,
    routingKey: UpdatePostCommand.routingKey,
    queue: UpdatePostCommand.queue,
  })
  async update(
    @RabbitPayload() message: UpdatePostCommand.Request,
  ): Promise<UpdatePostCommand.Response> {
    const payload = await this.postService.updatePost(
      message.userId,
      message.payload,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeletePostCommand.exchange,
    routingKey: DeletePostCommand.routingKey,
    queue: DeletePostCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeletePostCommand.Request,
  ): Promise<DeletePostCommand.Response> {
    await this.postService.deletePost(message.id);

    return createSuccessResponse(null);
  }
}
