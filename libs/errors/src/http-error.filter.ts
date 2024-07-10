import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP Error Filter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    const method = request.method;
    const url = request.originalUrl;

    this.logger.warn(`${status} | [${method}] ${url}`);

    response
      .status(status)
      .send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: exception.message,
        path: request.url,
      });
  }
}
