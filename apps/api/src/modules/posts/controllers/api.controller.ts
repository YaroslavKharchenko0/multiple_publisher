import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param, Query } from '@nestjs/common';
import {
  CreatePostCommand,
  DeletePostCommand,
  FindPostByIdQuery,
  FindPostsQuery,
  FindUserPostsQuery,
  UpdatePostCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  CreatePostBodyDto,
  FindPostsBodyDto,
  FindUserPostsBodyDto,
  UpdatePostBodyDto,
} from '@app/dtos';
import {
  IsStringNumberPipe,
  ModuleRoute,
  PostAccess,
  Route,
  User,
} from '@app/utils';
import { JWTUser } from '@app/types';

export const moduleName = 'post';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findPostById')
  @PostAccess({ isAuthor: true })
  findPostById(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
  ) {
    const payload: FindPostByIdQuery.Request = {
      id: Number(postId),
    };

    return this.amqpConnection.request<FindPostByIdQuery.Response>({
      exchange: FindPostByIdQuery.exchange,
      routingKey: FindPostByIdQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findPosts')
  @PostAccess({ isAuthor: true })
  findPosts(
    @TraceId() traceId: string | undefined,
    @Query('pagination') pagination: FindPostsBodyDto,
  ) {
    const payload: FindPostsQuery.Request = {
      pagination,
    };

    return this.amqpConnection.request<FindPostsQuery.Response>({
      exchange: FindPostsQuery.exchange,
      routingKey: FindPostsQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findUserPosts')
  @PostAccess({ isAuthor: true })
  findUserPosts(
    @TraceId() traceId: string | undefined,
    @Query('pagination') pagination: FindUserPostsBodyDto,
    @Param('userId', IsStringNumberPipe) userId: string,
  ) {
    const payload: FindUserPostsQuery.Request = {
      pagination,
      userId: Number(userId),
    };

    return this.amqpConnection.request<FindUserPostsQuery.Response>({
      exchange: FindUserPostsQuery.exchange,
      routingKey: FindUserPostsQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'create')
  @PostAccess({ isAuthor: true })
  create(
    @TraceId() traceId: string | undefined,
    @Body() body: CreatePostBodyDto,
    @User() user: JWTUser,
  ) {
    const payload: CreatePostCommand.Request = {
      ...body,
      userId: user?.app_id,
    };

    return this.amqpConnection.request<CreatePostCommand.Response>({
      exchange: CreatePostCommand.exchange,
      routingKey: CreatePostCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'delete')
  @PostAccess({ isAuthor: true })
  delete(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
  ) {
    const payload: DeletePostCommand.Request = {
      id: Number(postId),
    };

    return this.amqpConnection.request<DeletePostCommand.Response>({
      exchange: DeletePostCommand.exchange,
      routingKey: DeletePostCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'update')
  @PostAccess({ isAuthor: true })
  update(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Body() body: UpdatePostBodyDto,
  ) {
    const payload: UpdatePostCommand.Request = {
      ...body,
      postId: Number(postId),
    };

    return this.amqpConnection.request<UpdatePostCommand.Response>({
      exchange: UpdatePostCommand.exchange,
      routingKey: UpdatePostCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
