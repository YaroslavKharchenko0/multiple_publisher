import { Inject, Injectable } from "@nestjs/common";
import { BUNNY_CONFIG_KEY } from "./bunny.constants";
import { BunnyConfig, BunnyCreateVideoResponse, BunnyDeleteVideoResponse, CreateVideoParams, CreateVideoResponse, DeleteVideoFileParams, DeleteVideoResponse, GenerateSignatureParams } from "./bunny.types";
import { addHours } from "date-fns";
import { createHash } from "crypto";
import { toUnixTimestamp } from "@app/utils";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class BunnyStreamService {
  private readonly client;

  constructor(private readonly httpService: HttpService, @Inject(BUNNY_CONFIG_KEY) private readonly config: BunnyConfig) {
    const client = this.httpService.axiosRef;

    client.defaults.baseURL = this.config.stream.videoUrl;

    client.defaults.headers.common['accept'] = 'application/json';
    client.defaults.headers.common['content-type'] = 'application/*+json';
    client.defaults.headers.common['AccessKey'] =
      this.config.stream.apiKey

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
    const { title } = params;

    const libraryId = this.config.stream.libraryId;

    const path = `library/${libraryId}/videos`;

    try {
      const response = await this.client.post<
        BunnyCreateVideoResponse,
        CreateVideoResponse
      >(path, { title, thumbnailTime: 1 });

      if (response.status === 200) {
        return response.data;
      }

      return null;
    }
    catch (error) {
      throw new Error('Error create video in provider');
    }
  }

  async deleteVideoFile(params: DeleteVideoFileParams) {
    const { videoId } = params;

    const libraryId = this.config.stream.libraryId;

    const path = `library/${libraryId}/videos/${videoId}`;

    try {
      const response = await this.client.delete<
        BunnyDeleteVideoResponse,
        DeleteVideoResponse
      >(path);

      if (response.status === 200) {
        return response.data;
      }

      return null;
    } catch (error) {
      throw new Error('Error delete video in provider');
    }
  }
}
