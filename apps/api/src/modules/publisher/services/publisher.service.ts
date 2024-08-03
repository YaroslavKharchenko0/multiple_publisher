import {
  PublishPublicationResult,
  Service,
  PublishPublicationParams,
} from './publisher.service.interface';

export class PublisherService implements Service {
  publishPublication(
    params: PublishPublicationParams,
  ): PublishPublicationResult {
    throw new Error('Method not implemented.');
  }
}
