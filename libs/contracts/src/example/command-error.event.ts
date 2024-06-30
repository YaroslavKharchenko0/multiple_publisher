import { RmqResponse } from '../common'

export namespace CommandErrorCommand {
  export const exchange = 'example';

  export const routingKey = 'command-error';

  export const queue = 'command-error';

  export type Request = {
    message: string;
  }

  export type Response = RmqResponse<{ message: string }>
}

