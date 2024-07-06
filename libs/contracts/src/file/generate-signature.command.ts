import { RmqResponse } from '../common'
import { GenerateSignatureRequest, GenerateSignatureResponse } from '@app/validation'

export namespace GenerateSignatureCommand {
  export const exchange = 'file';

  export const routingKey = 'generate-signature';

  export const queue = 'generate-signature';

  export type Request = GenerateSignatureRequest;

  export type ResponsePayload = GenerateSignatureResponse;

  export type Response = RmqResponse<GenerateSignatureResponse>
}

