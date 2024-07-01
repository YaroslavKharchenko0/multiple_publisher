import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id"),
  email: text("email"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
