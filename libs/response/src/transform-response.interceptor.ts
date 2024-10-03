import { RmqResponse, SuccessResponse } from '@app/contracts';
import { HttpResponse } from '@app/types';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const createHttpResponse = (context: ExecutionContext, data: unknown) => {
  const request = context.switchToHttp().getRequest() as Request;

  const path = request.url;

  const timestamp = new Date().toISOString();

  return {
    data,
    path,
    timestamp,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRpcResponse = (data: any): data is RmqResponse<unknown> => {
  const isObject = typeof data === 'object';

  if (!isObject) {
    return false;
  }

  const isNull = data === null;

  if (isNull) {
    return false;
  }

  return 'isRmqResponse' in data;
};

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, HttpResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<HttpResponse> {
    const isRmqContext = isRabbitContext(context);

    if (isRmqContext) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        const isRpc = isRpcResponse(data);

        if (isRpc) {
          const rmqResponse = data as RmqResponse<unknown>;

          if (rmqResponse.isError) {
            throw new HttpException(
              rmqResponse.error.message,
              rmqResponse.code,
            );
          }

          const successResponse = rmqResponse as SuccessResponse<unknown>;
          return createHttpResponse(context, successResponse.payload);
        }

        return createHttpResponse(context, data);
      }),
    );
  }
}
