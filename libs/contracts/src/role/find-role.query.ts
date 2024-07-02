import { RmqResponse } from '../common'
import { FindRoleRequest, FindRoleResponse } from '@app/validation'

export namespace FindRoleQuery {
  export const exchange = 'role';

  export const routingKey = 'find-role';

  export const queue = 'find-role';

  export type Request = FindRoleRequest;

  export type ResponsePayload = FindRoleResponse;

  export type Response = RmqResponse<FindRoleResponse>
}

