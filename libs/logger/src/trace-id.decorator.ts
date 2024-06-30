import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TraceId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-trace-id'] as string | undefined;
  },
);
