import { PublicationProvider } from '@app/types';
import { YouTubeVideoUpload } from './youtube-video.upload';
import { YouTubeShortsUpload } from './youtube-shorts.upload';

export class UploadFactory {
  static createUpload(type: PublicationProvider) {
    switch (type) {
      case PublicationProvider.youtubeVideo:
        return new YouTubeVideoUpload();
      case PublicationProvider.youtubeShorts:
        return new YouTubeShortsUpload();
      default:
        throw new Error('Invalid upload type');
    }
  }
}
