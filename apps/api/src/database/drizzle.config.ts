import { resolve } from "path"

const schemaPath = resolve(__dirname, "drizzle.schema.ts")

const migrationsPath = 'apps/api/migrations'

export default {
  dialect: "postgresql",
  schema: schemaPath,
  out: migrationsPath,
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
}
