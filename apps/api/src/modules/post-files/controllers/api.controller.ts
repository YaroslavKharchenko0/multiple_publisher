import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreatePostFilesCommand,
  DeletePostFilesCommand,
  FindPostFilesQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, PostAccess } from '@app/utils';
import { CreatePostFilesDto } from '@app/dtos';

@Controller('posts/:postId/files')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get()
  @PostAccess({ isAuthor: true })
  findPostFiles(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
  ) {
    const payload: FindPostFilesQuery.Request = {
      postId: Number(postId),
    };

    return this.amqpConnection.request<FindPostFilesQuery.Response>({
      exchange: FindPostFilesQuery.exchange,
      routingKey: FindPostFilesQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Post()
  @PostAccess({ isAuthor: true })
  createPostFiles(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Body() body: CreatePostFilesDto,
  ) {
    const payload: CreatePostFilesCommand.Request = {
      postId: Number(postId),
      ...body,
    };

    return this.amqpConnection.request<CreatePostFilesCommand.Response>({
      exchange: CreatePostFilesCommand.exchange,
      routingKey: CreatePostFilesCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Delete()
  @PostAccess({ isAuthor: true })
  deletePostFiles(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
  ) {
    const payload: DeletePostFilesCommand.Request = {
      postId: Number(postId),
    };

    return this.amqpConnection.request<DeletePostFilesCommand.Response>({
      exchange: DeletePostFilesCommand.exchange,
      routingKey: DeletePostFilesCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
