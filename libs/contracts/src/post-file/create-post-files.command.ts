import { RmqResponse } from '../common';
import {
  CreatePostFilesRequest,
  CreatePostFilesResponse,
} from '@app/validation';

export namespace CreatePostFilesCommand {
  export const exchange = 'post-file';

  export const routingKey = 'create-post-files';

  export const queue = 'create-post-files';

  export type Request = CreatePostFilesRequest;

  export type ResponsePayload = CreatePostFilesResponse;

  export type Response = RmqResponse<CreatePostFilesResponse>;
}
