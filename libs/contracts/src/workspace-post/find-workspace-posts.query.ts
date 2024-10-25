import { RmqResponse } from '../common';
import {
  FindWorkspacePostsRequest,
  FindWorkspacePostsResponse,
} from '@app/validation';

export namespace FindWorkspacePostsQuery {
  export const exchange = 'workspace-post';

  export const routingKey = 'find-workspace-posts';

  export const queue = 'find-workspace-posts';

  export type Request = FindWorkspacePostsRequest;

  export type ResponsePayload = FindWorkspacePostsResponse;

  export type Response = RmqResponse<FindWorkspacePostsResponse>;
}
