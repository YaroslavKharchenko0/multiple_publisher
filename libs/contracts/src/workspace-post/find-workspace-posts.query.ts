import { RmqResponse } from '../common';
import {
  FindWorkspacePostsRequest,
  FindWorkspacePostsResponse,
} from '@app/validation';

export namespace FindWorkspacePostsQuery {
  export const exchange = 'workspace-post';

  export const routingKey = 'create-workspace-posts';

  export const queue = 'create-workspace-posts';

  export type Request = FindWorkspacePostsRequest;

  export type ResponsePayload = FindWorkspacePostsResponse;

  export type Response = RmqResponse<FindWorkspacePostsResponse>;
}
