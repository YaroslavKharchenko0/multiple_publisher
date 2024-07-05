import { RmqResponse } from '../common'
import { FindFileByIdRequest, FindFileByIdResponse } from '@app/validation'

export namespace FindFileByIdCommand {
  export const exchange = 'file';

  export const routingKey = 'find-file-by-id';

  export const queue = 'find-file-by-id';

  export type Request = FindFileByIdRequest;

  export type ResponsePayload = FindFileByIdResponse;

  export type Response = RmqResponse<FindFileByIdResponse>
}

