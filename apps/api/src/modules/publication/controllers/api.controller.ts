import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param, Query } from '@nestjs/common';
import {
  CreatePublicationCommand,
  DeletePublicationCommand,
  FindPostPublicationsQuery,
  FindPublicationQuery,
  UpdatePublicationCommand,
} from '@app/contracts';
import { TraceId } from '@app/logger';
import { IsStringNumberPipe, ModuleRoute, PostAccess, Route } from '@app/utils';
import {
  CreatePublicationDto,
  FindPostPublicationsDto,
  UpdatePublicationDto,
} from '@app/dtos';

export const moduleName = 'publication';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'create')
  @PostAccess({ isAuthor: true })
  create(
    @TraceId() traceId: string | undefined,
    @Body() body: CreatePublicationDto,
    @Param('postId', IsStringNumberPipe) postId: string,
  ) {
    const payload: CreatePublicationCommand.Request = {
      ...body,
      postId: Number(postId),
    };

    return this.amqpConnection.request<CreatePublicationCommand.Response>({
      exchange: CreatePublicationCommand.exchange,
      routingKey: CreatePublicationCommand.routingKey,
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
    @Body() body: UpdatePublicationDto,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
  ) {
    const payload: UpdatePublicationCommand.Request = {
      payload: body,
      postId: Number(postId),
      id: Number(publicationId),
    };

    return this.amqpConnection.publish<UpdatePublicationCommand.Request>(
      UpdatePublicationCommand.exchange,
      UpdatePublicationCommand.routingKey,
      payload,
      {
        headers: {
          traceId,
        },
      },
    );
  }

  @Route(moduleName, 'delete')
  @PostAccess({ isAuthor: true })
  delete(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
  ) {
    const payload: DeletePublicationCommand.Request = {
      postId: Number(postId),
      id: Number(publicationId),
    };

    return this.amqpConnection.request<DeletePublicationCommand.Response>({
      exchange: DeletePublicationCommand.exchange,
      routingKey: DeletePublicationCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findOne')
  @PostAccess({ isAuthor: true })
  findOne(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
  ) {
    const payload: FindPublicationQuery.Request = {
      postId: Number(postId),
      id: Number(publicationId),
    };

    return this.amqpConnection.request<FindPublicationQuery.Response>({
      exchange: FindPublicationQuery.exchange,
      routingKey: FindPublicationQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }

  @Route(moduleName, 'findMany')
  @PostAccess({ isAuthor: true })
  findMany(
    @TraceId() traceId: string | undefined,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Query() query: FindPostPublicationsDto,
  ) {
    const payload: FindPostPublicationsQuery.Request = {
      postId: Number(postId),
      pagination: query,
    };

    return this.amqpConnection.request<FindPostPublicationsQuery.Response>({
      exchange: FindPostPublicationsQuery.exchange,
      routingKey: FindPostPublicationsQuery.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
