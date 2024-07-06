import { ConfigService } from "@nestjs/config";
import { BunnyStorageConfig, BunnyStreamConfig } from "./bunny.types";

export const createBunnyConfig = (configService: ConfigService) => {
  const storage: BunnyStorageConfig = {
    storageEndpoint: configService.getOrThrow('BUNNY_STORAGE_ENDPOINT'),
    storageZoneName: configService.getOrThrow('BUNNY_STORAGE_ZONE_NAME'),
    storageApiKey: configService.getOrThrow('BUNNY_STORAGE_API_KEY'),
  }

  const stream: BunnyStreamConfig = {
    libraryId: configService.getOrThrow('BUNNY_STREAM_LIBRARY_ID'),
    apiKey: configService.getOrThrow('BUNNY_STREAM_API_KEY'),
    videoUrl: configService.getOrThrow('BUNNY_STREAM_VIDEO_URL'),
  }

  const config = {
    storage,
    stream,
  }

  return config;
}
