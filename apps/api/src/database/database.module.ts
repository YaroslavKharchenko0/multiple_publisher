import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { PG_CONNECTION } from './database.constants';
import * as schema from './drizzle.schema';
import { ConfigService } from '@nestjs/config';

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
            const ssl = configService.get<boolean>('DATABASE_SSL', false);

            const databaseUrl = configService.get<string>('DATABASE_URL');

            const pool = new Pool({
              connectionString: databaseUrl,
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
