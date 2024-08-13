import {
  FindPublicationProviderByIdQuery,
  FindPublicationProviderQuery,
  FindPublicationProvidersByAccountProviderQuery,
  FindPublicationProvidersQuery,
  createSuccessResponse,
} from '@app/contracts';
import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { PublicationProviderService } from '../services/publication-provider.service';

@Controller()
export class QueryController {
  constructor(
    private readonly publicationProviderService: PublicationProviderService,
  ) { }

  @RabbitRPC({
    exchange: FindPublicationProviderQuery.exchange,
    routingKey: FindPublicationProviderQuery.routingKey,
    queue: FindPublicationProviderQuery.queue,
  })
  async findOne(
    @RabbitPayload() message: FindPublicationProviderQuery.Request,
  ): Promise<FindPublicationProviderQuery.Response> {
    const payload =
      await this.publicationProviderService.findPublicationProvider(
        message.key,
      );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindPublicationProviderByIdQuery.exchange,
    routingKey: FindPublicationProviderByIdQuery.routingKey,
    queue: FindPublicationProviderByIdQuery.queue,
  })
  async findOneById(
    @RabbitPayload() message: FindPublicationProviderByIdQuery.Request,
  ): Promise<FindPublicationProviderByIdQuery.Response> {
    const payload = await this.publicationProviderService.findById(message.id);

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindPublicationProvidersQuery.exchange,
    routingKey: FindPublicationProvidersQuery.routingKey,
    queue: FindPublicationProvidersQuery.queue,
  })
  async findMany(
    @RabbitPayload() message: FindPublicationProvidersQuery.Request,
  ): Promise<FindPublicationProvidersQuery.Response> {
    const payload =
      await this.publicationProviderService.findPublicationProviders(
        message.pagination,
      );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: FindPublicationProvidersByAccountProviderQuery.exchange,
    routingKey: FindPublicationProvidersByAccountProviderQuery.routingKey,
    queue: FindPublicationProvidersByAccountProviderQuery.queue,
  })
  async findManyByAccountProvider(
    @RabbitPayload()
    message: FindPublicationProvidersByAccountProviderQuery.Request,
  ): Promise<FindPublicationProvidersByAccountProviderQuery.Response> {
    const payload =
      await this.publicationProviderService.findPublicationProvidersByAccountProvider(
        message.accountProviderId,
      );

    return createSuccessResponse(payload);
  }
}
