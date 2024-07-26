import { RmqResponse } from '../common';
import {
  DeletePublicationFilesRequest,
  DeletePublicationFilesResponse,
} from '@app/validation';

export namespace DeletePublicationFilesCommand {
  export const exchange = 'publication-file';

  export const routingKey = 'delete-publication-files';

  export const queue = 'delete-publication-files';

  export type Request = DeletePublicationFilesRequest;

  export type ResponsePayload = DeletePublicationFilesResponse;

  export type Response = RmqResponse<DeletePublicationFilesResponse>;
}
