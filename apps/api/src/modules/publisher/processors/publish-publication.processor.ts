import { PublishPublicationJob, PublisherQueue } from '@app/jobs';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor(PublisherQueue.queueName)
export class PublishPublicationProcessor extends WorkerHost {
  private readonly logger = new Logger(PublishPublicationProcessor.name);

  constructor() {
    super();
  }

  async process(
    job: Job<
      typeof PublishPublicationJob.request,
      Promise<typeof PublishPublicationJob.response>,
      string
    >,
  ) {
    try {
      this.logger.log(`Processing ${job.name}, job id: ${job.id}`);

      const traceId = `[JOB]-refresh-tokens-${job.id}`;

      return null;
    } catch (error) {
      this.logger.error(`Failed to process ${job.name}, job id: ${job.id}`);
      throw error;
    }
  }
}
