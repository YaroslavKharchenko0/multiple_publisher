import { RmqResponse } from '../common'
import { UploadFileRequest, UploadFileResponse } from '@app/validation'

export namespace UploadFileCommand {
  export const exchange = 'file';

  export const routingKey = 'generate-signature';

  export const queue = 'generate-signature';

  export type Request = UploadFileRequest;

  export type ResponsePayload = UploadFileResponse;

  export type Response = RmqResponse<UploadFileResponse>
}

