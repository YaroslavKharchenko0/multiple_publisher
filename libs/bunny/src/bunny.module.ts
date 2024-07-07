import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import { BUNNY_CONFIG_KEY, BUNNY_STORAGE_SERVICE, BUNNY_STREAM_SERVICE } from "./bunny.constants";
import { bunnyConfigProvider, bunnyStorageProvider, bunnyStreamProvider } from "./bunny.providers";

@Module({})
export class BunnyModule {
  static forRoot(): DynamicModule {
    return {
      module: BunnyModule,
      imports: [HttpModule],
      providers: [bunnyConfigProvider, bunnyStorageProvider, bunnyStreamProvider],
      exports: [BUNNY_CONFIG_KEY, BUNNY_STORAGE_SERVICE, BUNNY_STREAM_SERVICE],
    };
  }
}
