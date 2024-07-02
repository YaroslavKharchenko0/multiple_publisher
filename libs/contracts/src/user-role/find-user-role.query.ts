import { RmqResponse } from '../common'
import { FindUserRoleRequest, FindUserRoleResponse } from '@app/validation'

export namespace FindUserRoleCommand {
  export const exchange = 'user-role';

  export const routingKey = 'find-user-role';

  export const queue = 'find-user-role';

  export type Request = FindUserRoleRequest;

  export type ResponsePayload = FindUserRoleResponse;

  export type Response = RmqResponse<FindUserRoleResponse>
}

