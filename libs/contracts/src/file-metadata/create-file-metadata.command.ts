import { RmqResponse } from '../common'
import { CreateFileMetadataRequest, CreateFileMetadataResponse } from '@app/validation'

export namespace CreateFileMetadataCommand {
  export const exchange = 'file-metadata';

  export const routingKey = 'create-file-metadata';

  export const queue = 'create-file-metadata';

  export type Request = CreateFileMetadataRequest;

  export type ResponsePayload = CreateFileMetadataResponse;

  export type Response = RmqResponse<CreateFileMetadataResponse>
}

