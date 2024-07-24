import {
  FindPostPublicationsQuery,
  FindPublicationByIdQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PublicationService } from '../services/publication.service';

@Controller()
export class QueryController {
  constructor(private readonly publicationService: PublicationService) { }

  @RabbitRPC({
    exchange: FindPublicationByIdQuery.exchange,
    routingKey: FindPublicationByIdQuery.routingKey,
    queue: FindPublicationByIdQuery.queue,
  })
  async findById(
    @RabbitPayload() message: FindPublicationByIdQuery.Request,
  ): Promise<FindPublicationByIdQuery.Response> {
    const payload = await this.publicationService.findPublicationById(
      message.id,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindPostPublicationsQuery.exchange,
    routingKey: FindPostPublicationsQuery.routingKey,
    queue: FindPostPublicationsQuery.queue,
  })
  async findByPostId(
    @RabbitPayload() message: FindPostPublicationsQuery.Request,
  ): Promise<FindPostPublicationsQuery.Response> {
    const payload = await this.publicationService.findPostPublications(
      message.postId,
      message.pagination,
    );

    return createSuccessResponse(payload);
  }
}
