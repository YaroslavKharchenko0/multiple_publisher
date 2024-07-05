import { RmqResponse } from '../common'
import { UpdateWorkspaceUserRequest, UpdateWorkspaceUserResponse } from '@app/validation'

export namespace UpdateWorkspaceUserCommand {
  export const exchange = 'workspace-user';

  export const routingKey = 'update-workspace-user';

  export const queue = 'update-workspace-user';

  export type Request = UpdateWorkspaceUserRequest;

  export type ResponsePayload = UpdateWorkspaceUserResponse;

  export type Response = RmqResponse<UpdateWorkspaceUserResponse>
}

