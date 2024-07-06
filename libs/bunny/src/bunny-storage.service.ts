import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { BUNNY_CONFIG_KEY } from "./bunny.constants";
import { BunnyConfig } from "./bunny.types";

@Injectable()
export class BunnyStorageService {
  private client;

  constructor(private readonly httpService: HttpService, @Inject(BUNNY_CONFIG_KEY) private readonly config: BunnyConfig) {
    const client = this.httpService.axiosRef;

    client.defaults.baseURL = `${this.config.storage.storageEndpoint}/${this.config.storage.storageZoneName}`;

    this.client = client;
  }

  async uploadFile(filePath: string, file: Buffer) {
    const url = filePath;

    try {
      await this.client.put(url, file, {
        headers: {
          AccessKey: this.config.storage.storageApiKey,
          'Content-Type': 'application/octet-stream',
          Accept: 'application/json'
        }
      })
    }
    catch (error) {
      throw new Error("Error upload to provider");
    }
  }

  async deleteFile(filePath: string) {
    const url = filePath;

    try {
      await this.client.delete(url, {
        headers: {
          AccessKey: this.config.storage.storageApiKey,
        }
      })
    }
    catch (error) {
      throw new Error("Error delete from provider");
    }
  }

}
