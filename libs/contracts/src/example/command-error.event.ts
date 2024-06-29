import { RmqResponse } from '../common'

export namespace CommandErrorCommand {
  export const exchange = 'example';

  export const routingKey = 'command_error';

  export const queue = 'command';

  export type Request = {
    message: string;
  }

  export type Response = RmqResponse<{ message: string }>
}

