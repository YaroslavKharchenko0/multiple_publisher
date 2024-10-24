import { RmqResponse } from '../common';
import {
  FindWorkspaceAccountsRequest,
  FindWorkspaceAccountsResponse,
} from '@app/validation';

export namespace FindWorkspaceAccountsQuery {
  export const exchange = 'workspace-account';

  export const routingKey = 'find-workspace-accounts';

  export const queue = 'find-workspace-accounts';

  export type Request = FindWorkspaceAccountsRequest;

  export type ResponsePayload = FindWorkspaceAccountsResponse;

  export type Response = RmqResponse<FindWorkspaceAccountsResponse>;
}
