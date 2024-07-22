import { RmqModule } from '@app/rmq';
import { DynamicModule, Module } from '@nestjs/common';
import { CommandController } from './controllers/command.controller';
import { QueryController } from './controllers/query.controller';
import {
  fileMetadataRepositoryProvider,
  fileMetadataServiceProvider,
  FILE_METADATA_REPOSITORY,
  FILE_METADATA_SERVICE,
} from './providers/file-metadata.poviders';
import { ApiController } from './controllers/api.controller';
import { AdminApiController } from './controllers/admin-api.controller';

@Module({})
export class FileMetadataModule {
  static forRoot(): DynamicModule {
    return {
      module: FileMetadataModule,
      imports: [RmqModule.forRoot()],
      controllers: [
        AdminApiController,
        ApiController,
        CommandController,
        QueryController,
      ],
      providers: [fileMetadataRepositoryProvider, fileMetadataServiceProvider],
      exports: [FILE_METADATA_REPOSITORY, FILE_METADATA_SERVICE],
    };
  }
}
