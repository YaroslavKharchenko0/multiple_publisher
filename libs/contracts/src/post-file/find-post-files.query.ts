import { RmqResponse } from '../common';
import { FindPostFilesRequest, FindPostFilesResponse } from '@app/validation';

export namespace FindPostFilesQuery {
  export const exchange = 'post-file';

  export const routingKey = 'find-post-files';

  export const queue = 'find-post-files';

  export type Request = FindPostFilesRequest;

  export type ResponsePayload = FindPostFilesResponse;

  export type Response = RmqResponse<FindPostFilesResponse>;
}
