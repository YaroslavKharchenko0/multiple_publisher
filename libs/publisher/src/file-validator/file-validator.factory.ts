import { PublicationProvider } from '@app/types';
import { YoutubeVideoValidator } from './youtube-video.validator';
import { YouTubeShortsValidator } from './youtube-shorts.validator';
import { ConfigFactory } from '../configs/file-validator';

export class FileValidatorFactory {
  static createValidator(type: PublicationProvider) {
    const config = ConfigFactory.createConfig(type);

    switch (type) {
      case PublicationProvider.youtubeVideo:
        return new YoutubeVideoValidator(config);
      case PublicationProvider.youtubeShorts:
        return new YouTubeShortsValidator(config);
      default:
        throw new Error('Invalid publication provider');
    }
  }
}
