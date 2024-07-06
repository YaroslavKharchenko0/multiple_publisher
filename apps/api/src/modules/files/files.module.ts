import { RmqModule } from "@app/rmq";
import { DynamicModule, Module } from "@nestjs/common";
import { ApiController } from "./controllers/api.controller";
import { CommandController } from "./controllers/command.controller";
import { QueryController } from "./controllers/query.controller";
import { FILE_REPOSITORY, FILE_SERVICE, fileRepositoryProvider, fileServiceProvider } from "./providers/file.providers";
import { AdminApiController } from "./controllers/admin-api.controller";

@Module({})
export class FilesModule {
  static forRoot(): DynamicModule {
    return {
      module: FilesModule,
      imports: [RmqModule.forRoot()],
      controllers: [ApiController, AdminApiController, CommandController, QueryController],
      providers: [fileRepositoryProvider, fileServiceProvider],
      exports: [FILE_REPOSITORY, FILE_SERVICE]
    };
  }
}
