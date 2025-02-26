import { PublisherQueue } from '../../queues';

export abstract class PublishPublicationJob extends PublisherQueue {
  public static readonly jobName = 'publisher.publish-publication';

  public static request: {
    publicationId: number;
  };

  public static response: null;

  public static options = {
    removeOnComplete: true,
    attempts: 3,
  };
}
