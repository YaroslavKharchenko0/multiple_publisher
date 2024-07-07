import { RmqResponse } from '../common'
import { DeleteFileRequest, DeleteFileResponse } from '@app/validation'

export namespace DeleteFileCommand {
  export const exchange = 'file';

  export const routingKey = 'delete-file';

  export const queue = 'delete-file';

  export type Request = DeleteFileRequest;

  export type ResponsePayload = DeleteFileResponse;

  export type Response = RmqResponse<DeleteFileResponse>
}

