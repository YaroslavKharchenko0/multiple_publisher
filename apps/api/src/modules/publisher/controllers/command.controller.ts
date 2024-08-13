import { RabbitPayload, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import {
  createSuccessResponse,
  PublishPublicationCommand,
} from '@app/contracts';
import { InjectQueue } from '@nestjs/bullmq';
import { PublisherQueue, PublishPublicationJob } from '@app/jobs';
import { JobsOptions, Queue } from 'bullmq';

@Controller()
export class CommandController {
  constructor(
    @InjectQueue(PublisherQueue.queueName)
    private readonly publisherQueue: Queue,
  ) { }

  @RabbitRPC({
    exchange: PublishPublicationCommand.exchange,
    routingKey: PublishPublicationCommand.routingKey,
    queue: PublishPublicationCommand.queue,
  })
  async createPublish(
    @RabbitPayload() message: PublishPublicationCommand.Request,
  ): Promise<PublishPublicationCommand.Response> {
    const payload: typeof PublishPublicationJob.request = {
      publicationId: message.publicationId,
    };

    const now = Date.now();

    const delay = new Date(message.publishAt).getTime() - now;

    const options: JobsOptions = {
      ...PublishPublicationJob.options,
      delay: delay > 0 ? delay : 0,
    };

    await this.publisherQueue.add(
      PublishPublicationJob.jobName,
      payload,
      options,
    );

    return createSuccessResponse(null);
  }
}
