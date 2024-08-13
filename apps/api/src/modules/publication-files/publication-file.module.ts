import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { ApiController } from './controllers/api.controller';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import {
  publicationFileRepositoryProvider,
  publicationFileServiceProvider,
} from './providers/publication-file.providers';

@Module({})
export class PublicationFileModule {
  static forRoot(): DynamicModule {
    return {
      module: PublicationFileModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, CommandController, QueryController],
      providers: [
        publicationFileRepositoryProvider,
        publicationFileServiceProvider,
      ],
      exports: [
        publicationFileRepositoryProvider,
        publicationFileServiceProvider,
      ],
    };
  }
}
