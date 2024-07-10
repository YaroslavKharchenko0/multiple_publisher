import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { HTTPLoggingInterceptor, RMQLoggingInterceptor, TraceInterceptor, createLogger } from '@app/logger';
import { TransformInterceptor } from '@app/response'
import { RmqErrorInterceptor } from '@app/errors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule.forRoot(),
    new FastifyAdapter(),
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);

  const logger = createLogger(configService);

  app.useLogger(logger);

  app.useGlobalInterceptors(new TraceInterceptor(), new TransformInterceptor(), new RmqErrorInterceptor(), new HTTPLoggingInterceptor(), new RMQLoggingInterceptor())

  const port = Number(configService.getOrThrow<string>('PORT'));

  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();

  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap().catch((err) => {
  Logger.error(err);
});
