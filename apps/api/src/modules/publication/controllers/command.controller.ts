import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  CreatePublicationCommand,
  createSuccessResponse,
  DeletePublicationCommand,
  UpdatePublicationByIdCommand,
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
      publicationProviderId: message.publicationProviderId,
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
    const payload = await this.publicationService.updatePublication(
      message.id,
      message.postId,
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
    const payload = await this.publicationService.deletePublication(
      message.id,
      message.postId,
    );

    return createSuccessResponse(payload);
  }

  @RabbitRPC({
    exchange: UpdatePublicationByIdCommand.exchange,
    routingKey: UpdatePublicationByIdCommand.routingKey,
    queue: UpdatePublicationByIdCommand.queue,
  })
  async updateById(
    @RabbitPayload() message: UpdatePublicationByIdCommand.Request,
  ): Promise<UpdatePublicationByIdCommand.Response> {
    // TODO: Implement updateById
    throw new Error('Method not implemented');
  }
}
