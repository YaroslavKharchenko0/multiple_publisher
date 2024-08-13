import { Stream, Storage } from '@app/bunny';
import { ProviderAbstract } from './provider.abstract';
import { File, FileImage, FileVideo } from '@app/validation';
import { FileType } from '@app/types';
import { VideoFileConfig } from '../configs/file-validator';

export interface BunnyProviderServices {
  storage: Storage;
  stream: Stream;
}

export class BunnyProvider implements ProviderAbstract {
  constructor(private readonly services: BunnyProviderServices) { }

  private async createStorageConfig(file: FileImage): Promise<null> {
    return null;
  }

  private async createStreamConfig(
    file: FileVideo,
  ): Promise<VideoFileConfig | null> {
    try {
      const video = await this.services.stream.findVideoMetadata({
        videoId: file.providerId,
      });

      if (!video) {
        return null;
      }

      const downloadUrl = this.services.stream.getVideoUrl(file.providerId);

      const config: VideoFileConfig = {
        size: video.storageSize,
        length: video.length,
        format: 'MP4',
        resolution: {
          width: video.width,
          height: video.height,
        },
        aspectRatio: `${video.width}:${video.height}`,
        frameRate: video.framerate,
        videoCodec: 'H.264',
        audioCodec: 'AAC',
        audioBitrate: 128,
        downloadUrl,
      };

      return config;
    } catch (error) {
      return null;
    }
  }

  async createFileConfig(file: File) {
    const isImage = file.type === FileType.IMAGE;

    if (isImage) {
      return this.createStorageConfig(file as FileImage);
    }

    const isVideo = file.type === FileType.VIDEO;

    if (isVideo) {
      return this.createStreamConfig(file as FileVideo);
    }

    return null;
  }
}
