import { RmqResponse } from '../common'
import { UpdateUserRoleRequest, UpdateUserRoleResponse } from '@app/validation'

export namespace UpdateUserRoleCommand {
  export const exchange = 'user-role';

  export const routingKey = 'update-user-role';

  export const queue = 'update-user-role';

  export type Request = UpdateUserRoleRequest;

  export type ResponsePayload = UpdateUserRoleResponse;

  export type Response = RmqResponse<UpdateUserRoleResponse>
}

