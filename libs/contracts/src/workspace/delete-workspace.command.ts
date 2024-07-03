import { RmqResponse } from '../common'
import { DeleteWorkspaceRequest, DeleteWorkspaceResponse } from '@app/validation'

export namespace DeleteWorkspaceCommand {
  export const exchange = 'workspace';

  export const routingKey = 'delete-workspace';

  export const queue = 'delete-workspace';

  export type Request = DeleteWorkspaceRequest;

  export type ResponsePayload = DeleteWorkspaceResponse;

  export type Response = RmqResponse<DeleteWorkspaceResponse>
}

