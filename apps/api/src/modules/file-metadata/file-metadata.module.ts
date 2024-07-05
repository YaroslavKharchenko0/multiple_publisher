import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { fileMetadataRepositoryProvider, fileMetadataServiceProvider, FILE_METADATA_REPOSITORY, FILE_METADATA_SERVICE } from "./providers/file-metadata.poviders";

@Module({})
export class FileMetadataModule {
  static forRoot(): DynamicModule {
    return {
      module: FileMetadataModule,
      imports: [RmqModule.forRoot()],
      controllers: [CommandController, QueryController],
      providers: [fileMetadataRepositoryProvider, fileMetadataServiceProvider],
      exports: [FILE_METADATA_REPOSITORY, FILE_METADATA_SERVICE]
    };
  }
}
