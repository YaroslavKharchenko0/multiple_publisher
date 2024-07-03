import { RmqResponse } from '../common'
import { FindWorkspaceRoleRequest, FindWorkspaceRoleResponse } from '@app/validation'

export namespace FindWorkspaceRoleQuery {
  export const exchange = 'workspace-role';

  export const routingKey = 'find-workspace-role';

  export const queue = 'find-workspace-role';

  export type Request = FindWorkspaceRoleRequest;

  export type ResponsePayload = FindWorkspaceRoleResponse;

  export type Response = RmqResponse<FindWorkspaceRoleResponse>
}

