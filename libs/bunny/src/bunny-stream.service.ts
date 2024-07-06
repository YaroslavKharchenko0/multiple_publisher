import { Inject, Injectable } from "@nestjs/common";
import { BUNNY_CONFIG_KEY } from "./bunny.constants";
import { BunnyConfig, BunnyCreateVideoResponse, BunnyDeleteVideoResponse, CreateVideoParams, DeleteVideoFileParams, GenerateSignatureParams } from "./bunny.types";
import { addHours } from "date-fns";
import { createHash } from "crypto";
import { toUnixTimestamp } from "@app/utils";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class BunnyStreamService {
  private readonly client;

  private readonly baseUrl: string

  private readonly baseHeaders: Record<string, string> = {
    'accept': 'application/json',
    'content-type': 'application/*+json',
  }

  constructor(private readonly httpService: HttpService, @Inject(BUNNY_CONFIG_KEY) private readonly config: BunnyConfig) {
    const client = this.httpService.axiosRef;

    const baseUrl = this.config.stream.videoUrl

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

  async createVideo(params: CreateVideoParams): Promise<BunnyCreateVideoResponse | null> {
    const { title } = params;
    const libraryId = this.config.stream.libraryId;
    const path = `library/${libraryId}/videos`;

    const url = `${this.baseUrl}/${path}`

    try {
      const response = await this.client.post(url, { title, thumbnailTime: 1 }, { headers: this.baseHeaders });
      if (response.status === 200) {
        return response.data as BunnyCreateVideoResponse;
      }
      return null;
    } catch (error) {
      throw new Error('Error creating video in provider');
    }
  }

  async deleteVideoFile(params: DeleteVideoFileParams): Promise<BunnyDeleteVideoResponse | null> {
    const { videoId } = params;
    const libraryId = this.config.stream.libraryId;
    const path = `library/${libraryId}/videos/${videoId}`;

    const url = `${this.baseUrl}/${path}`

    try {
      const response = await this.client.delete(url);
      if (response.status === 200) {
        return response.data as BunnyDeleteVideoResponse;
      }
      return null;
    } catch (error) {
      throw new Error('Error deleting video in provider');
    }
  }
}
