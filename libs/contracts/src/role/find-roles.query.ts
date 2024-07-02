import { RmqResponse } from '../common'
import { FindRolesRequest, FindRolesResponse } from '@app/validation'

export namespace FindRolesQuery {
  export const exchange = 'role';

  export const routingKey = 'find-roles';

  export const queue = 'find-roles';

  export type Request = FindRolesRequest;

  export type ResponsePayload = FindRolesResponse;

  export type Response = RmqResponse<FindRolesResponse>
}

