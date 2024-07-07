import { RmqResponse } from '../common'
import { FindFileMetadataByFileIdRequest, FindFileMetadataByFileIdResponse } from '@app/validation'

export namespace FindFileMetadataByFileIdQuery {
  export const exchange = 'file-metadata';

  export const routingKey = 'find-file-metadata-by-file-id';

  export const queue = 'find-file-metadata-by-file-id';

  export type Request = FindFileMetadataByFileIdRequest;

  export type ResponsePayload = FindFileMetadataByFileIdResponse;

  export type Response = RmqResponse<FindFileMetadataByFileIdResponse>
}

