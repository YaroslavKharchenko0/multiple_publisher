import { Provider } from '@nestjs/common';
import { PublicationFileRepository } from '../repositories/publication-file.repository';
import { PublicationFileService } from '../services/publication-file.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

export const PUBLICATION_FILE_REPOSITORY = 'PUBLICATION_FILE_REPOSITORY';

export const PUBLICATION_FILE_SERVICE = 'PUBLICATION_FILE_SERVICE';

export const publicationFileRepositoryProvider: Provider = {
  provide: PUBLICATION_FILE_REPOSITORY,
  useClass: PublicationFileRepository,
};

export const publicationFileServiceProvider: Provider = {
  provide: PUBLICATION_FILE_SERVICE,
  useFactory: (
    repository: PublicationFileRepository,
    amqpConnection: AmqpConnection,
  ) => {
    return new PublicationFileService(repository, amqpConnection);
  },
  inject: [PUBLICATION_FILE_REPOSITORY, AmqpConnection],
};
