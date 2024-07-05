import { RmqResponse } from '../common'
import { DeleteWorkspaceUserRequest, DeleteWorkspaceUserResponse } from '@app/validation'

export namespace DeleteWorkspaceUserCommand {
  export const exchange = 'workspace-user';

  export const routingKey = 'delete-workspace-user';

  export const queue = 'delete-workspace-user';

  export type Request = DeleteWorkspaceUserRequest;

  export type ResponsePayload = DeleteWorkspaceUserResponse;

  export type Response = RmqResponse<DeleteWorkspaceUserResponse>
}

