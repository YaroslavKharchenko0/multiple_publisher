import { RmqResponse } from '../common'

export namespace CommandCommand {
  export const exchange = 'example';

  export const routingKey = 'command';

  export const queue = 'command';

  export type Request = {
    message: string;
  }

  export type Response = RmqResponse<{ message: string }>
}

