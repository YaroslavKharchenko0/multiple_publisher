import { RmqResponse } from '../common'
import { FindWorkspaceUsersRequest, FindWorkspaceUsersResponse } from '@app/validation'

export namespace FindWorkspaceUsersQuery {
  export const exchange = 'workspace-user';

  export const routingKey = 'find-workspace-users';

  export const queue = 'find-workspace-users';

  export type Request = FindWorkspaceUsersRequest;

  export type ResponsePayload = FindWorkspaceUsersResponse[];

  export type Response = RmqResponse<ResponsePayload>
}

