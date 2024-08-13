import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import {
  postFileRepositoryProvider,
  postFileServiceProvider,
} from './providers/post-file.providers';

@Module({})
export class PostFileModule {
  static forRoot(): DynamicModule {
    return {
      module: PostFileModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [postFileRepositoryProvider, postFileServiceProvider],
      exports: [postFileRepositoryProvider, postFileServiceProvider],
    };
  }
}
