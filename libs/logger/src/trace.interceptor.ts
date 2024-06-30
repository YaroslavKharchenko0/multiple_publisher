import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FastifyReply } from 'fastify';
import { tap } from 'rxjs/operators';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const isHttpContext = context.getType() === 'http';

    if (!isHttpContext) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const traceId = randomUUID();

    request.headers['x-trace-id'] = traceId;

    this.addTraceIdToResponse(response, traceId);

    return next.handle().pipe(
      tap(() => {
        if (isHttpContext) {
          const response = context.switchToHttp().getResponse();
          this.addTraceIdToResponse(response, traceId);
        }
      }),
    );
  }

  private addTraceIdToResponse(response: FastifyReply, traceId: string): void {
    response.header('x-trace-id', traceId);
  }
}
