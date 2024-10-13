import { RmqResponse } from '../common';
import {
  FindUserWorkspacesRequest,
  FindUserWorkspacesResponse,
} from '@app/validation';

export namespace FindUserWorkspacesQuery {
  export const exchange = 'workspace-user';

  export const routingKey = 'find-user-workspaces';

  export const queue = 'find-user-workspaces';

  export type Request = FindUserWorkspacesRequest;

  export type ResponsePayload = FindUserWorkspacesResponse;

  export type Response = RmqResponse<FindUserWorkspacesResponse>;
}
