import {
  createSuccessResponse,
  FindPostByIdQuery,
  FindPostsQuery,
  FindUserPostsQuery,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Inject } from '@nestjs/common';
import { POST_SERVICE } from '../providers/posts.providers';
import { PostService } from '../services/post.service';

@Controller()
export class QueryController {
  constructor(
    @Inject(POST_SERVICE) private readonly postService: PostService,
  ) { }

  @RabbitRPC({
    exchange: FindPostByIdQuery.exchange,
    routingKey: FindPostByIdQuery.routingKey,
    queue: FindPostByIdQuery.queue,
  })
  async findById(
    @RabbitPayload() message: FindPostByIdQuery.Request,
  ): Promise<FindPostByIdQuery.Response> {
    const payload = await this.postService.getPostById(message.id);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindPostsQuery.exchange,
    routingKey: FindPostsQuery.routingKey,
    queue: FindPostsQuery.queue,
  })
  async findPosts(
    @RabbitPayload() message: FindPostsQuery.Request,
  ): Promise<FindPostsQuery.Response> {
    const payload = await this.postService.getPosts(message.pagination);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindUserPostsQuery.exchange,
    routingKey: FindUserPostsQuery.routingKey,
    queue: FindUserPostsQuery.queue,
  })
  async findUserPosts(
    @RabbitPayload() message: FindUserPostsQuery.Request,
  ): Promise<FindUserPostsQuery.Response> {
    const payload = await this.postService.getUserPosts(
      message.userId,
      message.pagination,
    );

    return createSuccessResponse(payload);
  }
}
