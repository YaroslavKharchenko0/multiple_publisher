import { SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

export const createBullMqConfig = (): SharedBullAsyncConfiguration => {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        connection: {
          host: configService.getOrThrow('REDIS_HOST'),
          port: configService.getOrThrow('REDIS_PORT'),
          username: configService.get('REDIS_USERNAME'),
          password: configService.get('REDIS_PASSWORD'),
          db: configService.get('REDIS_DB', 0),
        },
        prefix: configService.get('REDIS_PREFIX', 'bullmq'),
      };
    },
  };
};
