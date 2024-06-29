import { RmqResponse } from '../common'

export namespace QueryQuery {
  export const exchange = 'example';

  export const routingKey = 'query';

  export const queue = 'query';

  export type Request = {
    message: string;
  }

  export type Response = RmqResponse<{ message: string }>
}

