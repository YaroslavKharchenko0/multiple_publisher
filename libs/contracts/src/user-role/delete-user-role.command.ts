import { RmqResponse } from '../common'
import { DeleteUserRoleRequest, DeleteUserRoleResponse } from '@app/validation'

export namespace DeleteUserRoleCommand {
  export const exchange = 'user-role';

  export const routingKey = 'delete-user-role';

  export const queue = 'delete-user-role';

  export type Request = DeleteUserRoleRequest;

  export type ResponsePayload = DeleteUserRoleResponse;

  export type Response = RmqResponse<DeleteUserRoleResponse>
}

