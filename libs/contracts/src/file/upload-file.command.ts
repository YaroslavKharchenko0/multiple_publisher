import { RmqResponse } from '../common'
import { UploadFileRequest, UploadFileResponse } from '@app/validation'

export namespace UploadFileCommand {
  export const exchange = 'file';

  export const routingKey = 'upload-file';

  export const queue = 'upload-file';

  export type Request = UploadFileRequest;

  export type ResponsePayload = UploadFileResponse;

  export type Response = RmqResponse<UploadFileResponse>
}

