import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from './database.constants';
import * as schema from './drizzle.schema';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';

@Module({})
@Global()
export class DatabaseModule {
  static forRoot() {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PG_CONNECTION,
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => {
            const host = configService.get<string>('DATABASE_HOST');
            const port = Number(configService.get<number>('DATABASE_PORT'));
            const password = configService.get<string>('DATABASE_PASSWORD');
            const database = configService.get<string>('DATABASE_NAME');
            const user = configService.get<string>('DATABASE_USER');

            const isEnableSSL = configService.get<boolean>(
              'DATABASE_SSL',
              false,
            );

            const rdsCaPath = configService.get<string>(
              'RDS_COMBINED_CA_BUNDLE',
            );

            const ca = await fs.promises.readFile(rdsCaPath).toString();

            const ssl = isEnableSSL
              ? {
                  rejectUnauthorized: false,
                  ca,
                }
              : false;

            const pool = new Pool({
              host,
              port,
              password,
              database,
              user,
              ssl,
            });

            return drizzle(pool, { schema });
          },
        },
      ],
      exports: [PG_CONNECTION],
    };
  }
}
