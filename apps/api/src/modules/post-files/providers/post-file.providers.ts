import { Provider } from '@nestjs/common';
import { PostFileRepository } from '../repositories/post-files.repository';
import { PostFileService } from '../services/post-file.service';

export const POST_FILE_REPOSITORY = 'POST_FILE_REPOSITORY';

export const POST_FILE_SERVICE = 'POST_FILE_SERVICE';

export const postFileRepositoryProvider: Provider = {
  provide: POST_FILE_REPOSITORY,
  useClass: PostFileRepository,
};

export const postFileServiceProvider: Provider = {
  provide: POST_FILE_SERVICE,
  useFactory: (repository: PostFileRepository) => {
    return new PostFileService(repository);
  },
  inject: [POST_FILE_REPOSITORY],
};
