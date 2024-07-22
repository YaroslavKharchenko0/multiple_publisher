import { Provider } from '@nestjs/common';
import { PostRepository } from '../repositories/posts.repository';
import { PostService } from '../services/post.service';
import { RmqErrorService } from '@app/errors';

export const POST_REPOSITORY = 'POST_REPOSITORY';
export const POST_SERVICE = 'POST_SERVICE';

export const postRepositoryProvider: Provider = {
  provide: POST_REPOSITORY,
  useClass: PostRepository,
};

export const postServiceProvider: Provider = {
  provide: POST_SERVICE,
  useFactory: (
    repository: PostRepository,
    rmqErrorService: RmqErrorService,
  ) => {
    return new PostService(repository, rmqErrorService);
  },
  inject: [POST_REPOSITORY, RmqErrorService],
};
