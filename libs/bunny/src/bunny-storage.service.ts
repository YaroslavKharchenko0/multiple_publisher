import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { BUNNY_CONFIG_KEY } from './bunny.constants';
import { BunnyConfig } from './bunny.types';
import { Storage, Stream } from './bunny.interfaces';

@Injectable()
export class BunnyStorageService implements Storage {
  private client;

  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @Inject(BUNNY_CONFIG_KEY) private readonly config: BunnyConfig,
  ) {
    const client = this.httpService.axiosRef;

    const baseUrl = `${this.config.storage.storageEndpoint}/${this.config.storage.storageZoneName}`;

    this.baseUrl = baseUrl;

    this.client = client;
  }
  async downloadFile(filePath: string): Promise<Stream> {
    const url = this.getFileUrl(filePath);

    try {
      const response = await this.client.get(url, {
        headers: {
          AccessKey: this.config.storage.storageApiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Error download from provider');
    }
  }

  private getFileUrl(filePath: string): string {
    const path = `${this.config.storage.storageEndpoint}/${this.config.storage.storageZoneName}/${filePath}`;

    return path;
  }

  async uploadFile(
    filePath: string,
    file: string,
    encoding: BufferEncoding = 'base64',
  ) {
    const url = `${this.baseUrl}/${filePath}`;

    const buffer = Buffer.from(file, encoding);

    try {
      await this.client.put(url, buffer, {
        headers: {
          AccessKey: this.config.storage.storageApiKey,
          'Content-Type': 'application/octet-stream',
          accept: 'application/json',
        },
      });
    } catch (error) {
      throw new Error('Error upload to provider');
    }
  }

  async deleteFile(filePath: string) {
    const url = `${this.baseUrl}/${filePath}`;

    try {
      await this.client.delete(url, {
        headers: {
          AccessKey: this.config.storage.storageApiKey,
        },
      });
    } catch (error) {
      throw new Error('Error delete from provider');
    }
  }
}
