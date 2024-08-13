import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  CreatePublicationProviderCommand,
  createSuccessResponse,
  DeletePublicationProviderCommand,
} from '@app/contracts';
import { PublicationProviderService } from '../services/publication-provider.service';

@Controller()
export class CommandController {
  constructor(
    private readonly publicationProviderService: PublicationProviderService,
  ) { }

  @RabbitRPC({
    exchange: CreatePublicationProviderCommand.exchange,
    routingKey: CreatePublicationProviderCommand.routingKey,
    queue: CreatePublicationProviderCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreatePublicationProviderCommand.Request,
  ): Promise<CreatePublicationProviderCommand.Response> {
    const payload =
      await this.publicationProviderService.createPublicationProvider({
        accountProviderId: message.accountProviderId,
        key: message.key,
      });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeletePublicationProviderCommand.exchange,
    routingKey: DeletePublicationProviderCommand.routingKey,
    queue: DeletePublicationProviderCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeletePublicationProviderCommand.Request,
  ): Promise<DeletePublicationProviderCommand.Response> {
    const payload =
      await this.publicationProviderService.deletePublicationProvider(
        message.key,
      );

    return createSuccessResponse(payload);
  }
}
