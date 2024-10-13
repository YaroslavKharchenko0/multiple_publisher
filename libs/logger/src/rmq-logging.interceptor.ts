import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class RMQLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('RMQ');

  intercept(context: ExecutionContext, next: CallHandler) {
    const isRmqContext = isRabbitContext(context);

    if (!isRmqContext) {
      return next.handle();
    }

    const now = Date.now();
    const rmqContext = context.switchToRpc().getContext();

    const exchange = rmqContext.fields.exchange;
    const routingKey = rmqContext.fields.routingKey;
    const traceId = this.executeTraceId(rmqContext);

    return next.handle().pipe(
      tap(() => {
        const delay = Date.now() - now;
        this.logger.log(
          `[${exchange}] ${routingKey} - ${delay}ms, traceId: ${traceId}`,
        );
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        this.logger.error(
          `[${exchange}] ${routingKey} - ${delay}ms, traceId: ${traceId} - ${error}`,
        );
        throw error;
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private executeTraceId = (rmqContext: any) => {
    const traceId: string | undefined =
      rmqContext?.properties?.headers?.traceId;

    return traceId;
  };
}
