import { PublicationProvider } from '@app/types';
import { createYoutubeVideoValidatorConfig } from './youtube-video.config';
import { createYoutubeShortsValidatorConfig } from './youtube.shorts.config';
import { VideoConfig } from './file-validator.interfaces';

export type FileValidatorConfig = VideoConfig;

export class ConfigFactory {
  static createConfig(publicationProvider: PublicationProvider) {
    const configMap: Record<PublicationProvider, FileValidatorConfig> = {
      youtube_video: createYoutubeVideoValidatorConfig(),
      youtube_shorts: createYoutubeShortsValidatorConfig(),
    };

    return configMap[publicationProvider];
  }
}
