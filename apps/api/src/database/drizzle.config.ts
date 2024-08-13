import { resolve } from 'path';
import fs from 'fs';
import type { Config } from 'drizzle-kit';

const schemaPath = resolve(__dirname, 'drizzle.schema.ts');

const migrationsPath = 'apps/api/migrations';

const certPath = process.env.RDS_COMBINED_CA_BUNDLE;

const isEnableSSL = process.env.DATABASE_SSL === 'true';

const ssl = isEnableSSL
  ? {
    rejectUnauthorized: false,
    ca: fs.readFileSync(certPath).toString(),
  }
  : false;

const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT);
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;

export default {
  dialect: 'postgresql',
  schema: schemaPath,
  out: migrationsPath,
  dbCredentials: {
    host,
    port,
    password,
    database,
    user,
    ssl,
  },
} satisfies Config;
