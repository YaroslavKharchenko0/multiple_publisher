import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  CreatePublicationCommand,
  createSuccessResponse,
  DeletePublicationCommand,
  UpdatePublicationCommand,
} from '@app/contracts';
import { PublicationService } from '../services/publication.service';

@Controller()
export class CommandController {
  constructor(private readonly publicationService: PublicationService) { }

  @RabbitRPC({
    exchange: CreatePublicationCommand.exchange,
    routingKey: CreatePublicationCommand.routingKey,
    queue: CreatePublicationCommand.queue,
  })
  async create(
    @RabbitPayload() message: CreatePublicationCommand.Request,
  ): Promise<CreatePublicationCommand.Response> {
    const payload = await this.publicationService.createPublication({
      accountId: message.accountId,
      postId: message.postId,
      title: message.title,
      description: message.description,
    });

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdatePublicationCommand.exchange,
    routingKey: UpdatePublicationCommand.routingKey,
    queue: UpdatePublicationCommand.queue,
  })
  async update(
    @RabbitPayload() message: UpdatePublicationCommand.Request,
  ): Promise<UpdatePublicationCommand.Response> {
    const payload = await this.publicationService.updatePublicationById(
      message.id,
      message.payload,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: DeletePublicationCommand.exchange,
    routingKey: DeletePublicationCommand.routingKey,
    queue: DeletePublicationCommand.queue,
  })
  async delete(
    @RabbitPayload() message: DeletePublicationCommand.Request,
  ): Promise<DeletePublicationCommand.Response> {
    const payload = await this.publicationService.deletePublicationById(
      message.id,
    );

    return createSuccessResponse(payload);
  }
}
