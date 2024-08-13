import { AccountToken } from '@app/validation';
import { UploadAbstract, UploadParams } from './upload.abstract';
import { convertArrayToMap } from '@app/utils';
import { OAuth2Client } from 'google-auth-library';
import { AccountTokenType } from '@app/types';
import { BlobObject } from '../file-validator/file-validator.abstract';
import { youtube } from '@googleapis/youtube';
import axios from 'axios';
import { Readable } from 'stream';

export class YouTubeVideoUpload extends UploadAbstract {
  private createClient(tokens: AccountToken[]) {
    const tokenMap = convertArrayToMap({
      array: tokens,
      getId: (token) => token.type,
    });

    const client = new OAuth2Client();

    const accessToken = tokenMap.get(AccountTokenType.ACCESS);
    const refreshToken = tokenMap.get(AccountTokenType.REFRESH);

    client.setCredentials({
      access_token: accessToken?.token,
      refresh_token: refreshToken?.token,
    });

    return client;
  }

  private async createDownloadStreamByObject(
    object: BlobObject,
  ): Promise<Readable> {
    const response = await axios({
      method: 'GET',
      url: object.config.downloadUrl,
      responseType: 'stream',
    });

    return response.data;
  }

  override async upload(params: UploadParams): Promise<void> {
    const client = this.createClient(params.accountTokens);

    const [object] = params.objects;

    if (!object) {
      throw new Error('No objects provided');
    }

    const downloadStream = await this.createDownloadStreamByObject(object);

    await youtube('v3').videos.insert({
      auth: client as any, //TODO: need check is work ??
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: params.publication.title,
          description: params.publication.description,
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: downloadStream,
      },
    });
  }
}
