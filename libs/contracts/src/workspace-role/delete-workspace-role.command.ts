import { RmqResponse } from '../common'
import { DeleteWorkspaceRoleRequest, DeleteWorkspaceRoleResponse } from '@app/validation'

export namespace DeleteWorkspaceRoleCommand {
  export const exchange = 'workspace-role';

  export const routingKey = 'delete-workspace-role';

  export const queue = 'delete-workspace-role';

  export type Request = DeleteWorkspaceRoleRequest;

  export type ResponsePayload = DeleteWorkspaceRoleResponse;

  export type Response = RmqResponse<DeleteWorkspaceRoleResponse>
}

