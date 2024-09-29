import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RawServerDefault } from 'fastify';
import { patchNestJsSwagger } from 'nestjs-zod';

export const createSwagger = async (
  app: NestFastifyApplication<RawServerDefault>,
) => {
  const builder = new DocumentBuilder();

  const configService = app.get(ConfigService);

  builder.setTitle('API');
  builder.setDescription('API description');

  const appVersion = configService.getOrThrow<string>('VERSION');

  builder.setVersion(appVersion);

  patchNestJsSwagger();

  const config = builder.build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
};
