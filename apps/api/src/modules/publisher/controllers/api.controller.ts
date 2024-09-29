import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Param } from '@nestjs/common';
import { PublishPublicationCommand } from '@app/contracts';
import { TraceId } from '@app/logger';
import {
  IsStringNumberPipe,
  ModuleRoute,
  PostAccess,
  Roles,
  Route,
} from '@app/utils';
import { Role } from '@app/types';
import { PublishPublicationDto } from '@app/dtos';

export const moduleName = 'publisher';

@ModuleRoute(moduleName)
export class ApiController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Route(moduleName, 'createPublish')
  @Roles(Role.USER, Role.ADMIN)
  @PostAccess({ isAuthor: true })
  createPublish(
    @TraceId() traceId: string | undefined,
    @Param('publicationId', IsStringNumberPipe) publicationId: string,
    @Param('postId', IsStringNumberPipe) postId: string,
    @Body() body: PublishPublicationDto,
  ) {
    const payload: PublishPublicationCommand.Request = {
      ...body,
      publicationId: Number(publicationId),
      postId: Number(postId),
    };

    return this.amqpConnection.request<PublishPublicationCommand.Response>({
      exchange: PublishPublicationCommand.exchange,
      routingKey: PublishPublicationCommand.routingKey,
      payload,
      headers: {
        traceId,
      },
    });
  }
}
