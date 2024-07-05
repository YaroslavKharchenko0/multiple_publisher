import { RmqResponse } from '../common'
import { DeleteFileMetadataRequest, DeleteFileMetadataResponse } from '@app/validation'

export namespace DeleteFileMetadataCommand {
  export const exchange = 'file-metadata';

  export const routingKey = 'delete-file-metadata';

  export const queue = 'delete-file-metadata';

  export type Request = DeleteFileMetadataRequest;

  export type ResponsePayload = DeleteFileMetadataResponse;

  export type Response = RmqResponse<DeleteFileMetadataResponse>
}

