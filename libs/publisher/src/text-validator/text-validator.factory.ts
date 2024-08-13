import { PublicationProvider } from '@app/types';
import { YouTubeVideoTextValidator } from './youtube-video.validator';
import { YouTubeShortsTextValidator } from './youtube-shorts.validator';

export class TextValidatorFactory {
  static createValidator(type: PublicationProvider) {
    switch (type) {
      case PublicationProvider.youtubeVideo:
        return new YouTubeVideoTextValidator();
      case PublicationProvider.youtubeShorts:
        return new YouTubeShortsTextValidator();
      default:
        throw new Error('Invalid publication provider');
    }
  }
}
