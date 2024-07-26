import { RmqResponse } from '../common';
import {
  CreatePublicationFilesRequest,
  CreatePublicationFilesResponse,
} from '@app/validation';

export namespace CreatePublicationFilesCommand {
  export const exchange = 'publication-file';

  export const routingKey = 'create-publication-files';

  export const queue = 'create-publication-files';

  export type Request = CreatePublicationFilesRequest;

  export type ResponsePayload = CreatePublicationFilesResponse;

  export type Response = RmqResponse<CreatePublicationFilesResponse>;
}
