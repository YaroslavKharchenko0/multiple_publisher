import { RmqResponse } from '../common'
import { CreateWorkspaceRoleRequest, CreateWorkspaceRoleResponse } from '@app/validation'

export namespace CreateWorkspaceRoleCommand {
  export const exchange = 'workspace-role';

  export const routingKey = 'create-workspace-role';

  export const queue = 'create-workspace-role';

  export type Request = CreateWorkspaceRoleRequest;

  export type ResponsePayload = CreateWorkspaceRoleResponse;

  export type Response = RmqResponse<CreateWorkspaceRoleResponse>
}

