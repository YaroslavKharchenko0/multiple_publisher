import { RmqResponse } from '../common'
import { FindByIdWorkspaceRequest, FindByIdWorkspaceResponse } from '@app/validation'

export namespace FindByIdWorkspaceQuery {
  export const exchange = 'workspace';

  export const routingKey = 'find-by-id-workspace';

  export const queue = 'find-by-id-workspace';

  export type Request = FindByIdWorkspaceRequest;

  export type ResponsePayload = FindByIdWorkspaceResponse;

  export type Response = RmqResponse<FindByIdWorkspaceResponse>
}

