import { RmqResponse } from '../common'
import { UpdateFileRequest, UpdateFileResponse } from '@app/validation'

export namespace UpdateFileCommand {
  export const exchange = 'file';

  export const routingKey = 'update-file';

  export const queue = 'update-file';

  export type Request = UpdateFileRequest;

  export type ResponsePayload = UpdateFileResponse;

  export type Response = RmqResponse<UpdateFileResponse>
}

