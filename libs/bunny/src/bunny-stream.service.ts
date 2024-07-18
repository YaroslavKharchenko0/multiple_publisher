import { Inject, Injectable } from '@nestjs/common';
import { BUNNY_CONFIG_KEY } from './bunny.constants';
import {
  BunnyConfig,
  BunnyCreateVideoResponse,
  BunnyDeleteVideoResponse,
  CreateVideoParams,
  DeleteVideoFileParams,
  GenerateSignatureParams,
} from './bunny.types';
import { addHours } from 'date-fns';
import { createHash } from 'crypto';
import { toUnixTimestamp } from '@app/utils';
import { HttpService } from '@nestjs/axios';
import { UploadStatus } from '@app/types';

@Injectable()
export class BunnyStreamService {
  private readonly client;

  private readonly baseUrl: string;

  private readonly baseHeaders: Record<string, string> = {
    accept: 'application/json',
    'content-type': 'application/*+json',
  };

  readonly statusMap = {
    0: UploadStatus.QUEUED,
    1: UploadStatus.PROCESSING,
    2: UploadStatus.ENCODING,
    3: UploadStatus.FINISHED,
    4: UploadStatus.RESOLUTION_FINISHED,
    5: UploadStatus.FAILED,
    6: UploadStatus.PRESIGNED_UPLOAD_STARTED,
    7: UploadStatus.PRESIGNED_UPLOAD_FINISHED,
    8: UploadStatus.PRESIGNED_UPLOAD_FAILED,
    9: UploadStatus.CAPTIONS_GENERATED,
    10: UploadStatus.TITLE_OR_DESCRIPTION_GENERATED,
  };

  constructor(
    private readonly httpService: HttpService,
    @Inject(BUNNY_CONFIG_KEY) private readonly config: BunnyConfig,
  ) {
    const client = this.httpService.axiosRef;

    const baseUrl = this.config.stream.videoUrl;

    this.baseUrl = baseUrl;

    this.baseHeaders['AccessKey'] = this.config.stream.apiKey;

    this.client = client;
  }

  generateSignature(params: GenerateSignatureParams) {
    const currentDate = Date.now();

    const defaultExpirationTime = addHours(currentDate, 1);

    const { expirationTime = defaultExpirationTime, videoId } = params;

    const libraryId = this.config.stream.libraryId;

    const apiKey = this.config.stream.apiKey;

    const hash = createHash('sha256');

    const unixExpirationTime = toUnixTimestamp(expirationTime);

    hash.update(libraryId + apiKey + unixExpirationTime + videoId);

    const signature = hash.digest('hex');

    return {
      signature,
      unixExpirationTime,
      videoId,
      libraryId,
    };
  }

  async createVideo(
    params: CreateVideoParams,
  ): Promise<BunnyCreateVideoResponse | null> {
    const { title, thumbnailTime = 1 } = params;
    const libraryId = this.config.stream.libraryId;
    const path = `library/${libraryId}/videos`;

    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await this.client.post(
        url,
        { title, thumbnailTime },
        { headers: this.baseHeaders },
      );
      if (response.status === 200) {
        return response.data as BunnyCreateVideoResponse;
      }
      return null;
    } catch (error) {
      throw new Error('Error creating video in provider');
    }
  }

  async deleteVideoFile(
    params: DeleteVideoFileParams,
  ): Promise<BunnyDeleteVideoResponse | null> {
    const { videoId } = params;
    const libraryId = this.config.stream.libraryId;

    const path = `library/${libraryId}/videos/${videoId}`;

    const url = `${this.baseUrl}/${path}`;

    try {
      const response = await this.client.delete(url, {
        headers: this.baseHeaders,
      });
      if (response.status === 200) {
        return response.data as BunnyDeleteVideoResponse;
      }
      return null;
    } catch (error) {
      throw new Error('Error deleting video in provider');
    }
  }
}
