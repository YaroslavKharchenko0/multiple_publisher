import { RmqResponse } from '../common'
import { FindWorkspaceRoleByIdRequest, FindWorkspaceRoleByIdResponse } from '@app/validation'

export namespace FindWorkspaceRoleByIdQuery {
  export const exchange = 'workspace-role';

  export const routingKey = 'find-workspace-role-by-id';

  export const queue = 'find-workspace-role-by-id';

  export type Request = FindWorkspaceRoleByIdRequest;

  export type ResponsePayload = FindWorkspaceRoleByIdResponse;

  export type Response = RmqResponse<FindWorkspaceRoleByIdResponse>
}

