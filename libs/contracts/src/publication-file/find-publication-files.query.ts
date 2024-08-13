import { RmqResponse } from '../common';
import {
  FindPublicationFilesRequest,
  FindPublicationFilesResponse,
} from '@app/validation';

export namespace FindPublicationFilesQuery {
  export const exchange = 'publication-file';

  export const routingKey = 'find-publication-files';

  export const queue = 'find-publication-files';

  export type Request = FindPublicationFilesRequest;

  export type ResponsePayload = FindPublicationFilesResponse;

  export type Response = RmqResponse<FindPublicationFilesResponse>;
}
