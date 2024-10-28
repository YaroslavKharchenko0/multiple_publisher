import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler) {
    const isHttpContext = context.getType() === 'http';

    if (!isHttpContext) {
      return next.handle();
    }

    const now = Date.now();
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const method = request.method;
    const url = request.originalUrl;
    const traceId = this.executeTraceId(request);

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        this.logger.log(
          `${response.statusCode} | [${method}] ${url} - ${delay}ms, traceId: ${traceId}`,
        );
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const delay = Date.now() - now;
        this.logger.error(
          `${response.statusCode} | [${method}] ${url} - ${delay}ms, traceId: ${traceId}`,
        );
        throw error;
      }),
    );
  }

  private executeTraceId = (request: FastifyRequest) => {
    const traceId = request.headers['x-trace-id'] as string | undefined;

    return traceId;
  };
}
