import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  CreatePublicationFilesCommand,
  DeletePublicationFilesCommand,
  FindPublicationFilesQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, PostAccess } from '@app/utils';
import { CreatePublicationFilesDto } from '@app/validation';

@Controller('posts/:postId/publications/:publicationId/files')
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get()
  @PostAccess({ isAuthor: true })
  findPublicationFiles(
    @TraceId() traceId: string | undefined,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
  ) {
    const payload: FindPublicationFilesQuery.Request = {
      publicationId: Number(publicationId),
    };

    return this.amqpConnection.request<FindPublicationFilesQuery.Response>({
      exchange: FindPublicationFilesQuery.exchange,
      routingKey: FindPublicationFilesQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Post()
  @PostAccess({ isAuthor: true })
  createPublicationFiles(
    @TraceId() traceId: string | undefined,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
    @Body() body: CreatePublicationFilesDto,
  ) {
    const payload: CreatePublicationFilesCommand.Request = {
      publicationId: Number(publicationId),
      ...body,
      isOriginal: false,
    };

    return this.amqpConnection.request<CreatePublicationFilesCommand.Response>({
      exchange: CreatePublicationFilesCommand.exchange,
      routingKey: CreatePublicationFilesCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Delete()
  @PostAccess({ isAuthor: true })
  deletePublicationFiles(
    @TraceId() traceId: string | undefined,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
  ) {
    const payload: DeletePublicationFilesCommand.Request = {
      publicationId: Number(publicationId),
    };

    return this.amqpConnection.request<DeletePublicationFilesCommand.Response>({
      exchange: DeletePublicationFilesCommand.exchange,
      routingKey: DeletePublicationFilesCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
