import { DynamicModule, Global, Module } from "@nestjs/common";
import { UserFacade } from "./user.facade";
import { FileFacade } from "./file.facade";
import { RmqModule } from "@app/rmq";

@Module({})
@Global()
export class FacadeModule {
  static forRoot(): DynamicModule {
    return {
      module: FacadeModule,
      imports: [RmqModule.forRoot()],
      providers: [FileFacade, UserFacade],
      exports: [FileFacade, UserFacade],
      global: true
    }
  }
}
