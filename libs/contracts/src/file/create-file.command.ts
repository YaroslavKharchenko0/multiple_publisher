import { RmqResponse } from '../common'
import { CreateFileRequest, CreateFileResponse } from '@app/validation'

export namespace CreateFileCommand {
  export const exchange = 'file';

  export const routingKey = 'create-file';

  export const queue = 'create-file';

  export type Request = CreateFileRequest;

  export type ResponsePayload = CreateFileResponse;

  export type Response = RmqResponse<CreateFileResponse>
}

