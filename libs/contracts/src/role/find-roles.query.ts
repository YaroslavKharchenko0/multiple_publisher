import { RmqResponse } from '../common'
import { FindRolesRequest, FindRolesResponse } from '@app/validation'

export namespace FindRolesQuery {
  export const exchange = 'role';

  export const routingKey = 'find-role';

  export const queue = 'find-role';

  export type Request = FindRolesRequest;

  export type ResponsePayload = FindRolesResponse;

  export type Response = RmqResponse<FindRolesResponse>
}

