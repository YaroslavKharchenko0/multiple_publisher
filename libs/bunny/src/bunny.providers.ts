import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createBunnyConfig } from "./bunny.config";
import { BUNNY_CONFIG_KEY, BUNNY_STORAGE_SERVICE, BUNNY_STREAM_SERVICE } from "./bunny.constants";
import { BunnyStorageService } from "./bunny-storage.service";
import { HttpService } from "@nestjs/axios";
import { BunnyStreamService } from "./bunny-stream.service";

export const bunnyConfigProvider: Provider = {
  provide: BUNNY_CONFIG_KEY,
  useFactory: createBunnyConfig,
  inject: [ConfigService],
}

export const bunnyStorageProvider: Provider = {
  provide: BUNNY_STORAGE_SERVICE,
  useFactory: (config, httpService: HttpService) => {
    return new BunnyStorageService(httpService, config);
  },
  inject: [BUNNY_CONFIG_KEY, HttpService],
}

export const bunnyStreamProvider: Provider = {
  provide: BUNNY_STREAM_SERVICE,
  useFactory: (config, httpService: HttpService) => {
    return new BunnyStreamService(httpService, config);
  },
  inject: [BUNNY_CONFIG_KEY, HttpService],
}
