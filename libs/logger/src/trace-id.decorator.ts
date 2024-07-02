import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TraceId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const isRMQ = isRabbitContext(ctx);

    if (isRMQ) {
      const rmqContext = ctx.switchToRpc().getContext()

      const traceId: string | undefined = rmqContext.properties.headers.traceId

      return traceId;
    }

    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-trace-id'] as string | undefined;
  },
);
