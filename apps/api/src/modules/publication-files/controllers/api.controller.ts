import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param } from '@nestjs/common';
import {
  CreatePublicationFilesCommand,
  DeletePublicationFilesCommand,
  FindPublicationFilesQuery,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, ModuleRoute, PostAccess, Route } from '@app/utils';
import { CreatePublicationFilesDto } from '@app/dtos';

export const moduleName = 'publicationFiles';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'findPublicationFiles')
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

  @Route(moduleName, 'createPublicationFiles')
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

  @Route(moduleName, 'deletePublicationFiles')
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
