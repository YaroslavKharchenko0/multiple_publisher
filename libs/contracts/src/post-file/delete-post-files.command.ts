import { RmqResponse } from '../common';
import {
  DeletePostFilesRequest,
  DeletePostFilesResponse,
} from '@app/validation';

export namespace DeletePostFilesCommand {
  export const exchange = 'post-file';

  export const routingKey = 'delete-post-files';

  export const queue = 'delete-post-files';

  export type Request = DeletePostFilesRequest;

  export type ResponsePayload = DeletePostFilesResponse;

  export type Response = RmqResponse<DeletePostFilesResponse>;
}
