import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RawServerDefault } from 'fastify';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

export const createSwagger = async (
  app: NestFastifyApplication<RawServerDefault>,
) => {
  const builder = new DocumentBuilder();

  const configService = app.get(ConfigService);

  builder.setTitle('API');
  builder.setDescription('API description');

  const appVersion = configService.getOrThrow<string>('VERSION');

  builder.setVersion(appVersion);

  patchNestjsSwagger();

  const config = builder.build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
};
