import { RmqResponse } from '../common'
import { FindUserFilesRequest, FindUserFilesResponse } from '@app/validation'

export namespace FindUserFilesQuery {
  export const exchange = 'file';

  export const routingKey = 'find-user-files';

  export const queue = 'find-user-files';

  export type Request = FindUserFilesRequest;

  export type ResponsePayload = FindUserFilesResponse;

  export type Response = RmqResponse<FindUserFilesResponse>
}

