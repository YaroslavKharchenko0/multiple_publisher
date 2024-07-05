import { RmqResponse } from '../common'
import { FindWorkspaceUserRequest, FindWorkspaceUserResponse } from '@app/validation'

export namespace FindWorkspaceUserCommand {
  export const exchange = 'workspace-user';

  export const routingKey = 'find-workspace-user';

  export const queue = 'find-workspace-user';

  export type Request = FindWorkspaceUserRequest;

  export type ResponsePayload = FindWorkspaceUserResponse;

  export type Response = RmqResponse<FindWorkspaceUserResponse>
}

