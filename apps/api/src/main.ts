import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { createLogger } from '@app/logger';
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

  app.useGlobalInterceptors(new TransformInterceptor(), new RmqErrorInterceptor())

  const port = Number(configService.getOrThrow<string>('PORT'));

  await app.listen(port);

  const url = await app.getUrl();

  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap();
