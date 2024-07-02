import { RmqResponse } from '../common'
import { DeleteRoleRequest, DeleteRoleResponse } from '@app/validation'

export namespace DeleteRoleCommand {
  export const exchange = 'role';

  export const routingKey = 'delete-role';

  export const queue = 'delete-role';

  export type Request = DeleteRoleRequest;

  export type ResponsePayload = DeleteRoleResponse;

  export type Response = RmqResponse<DeleteRoleResponse>
}

