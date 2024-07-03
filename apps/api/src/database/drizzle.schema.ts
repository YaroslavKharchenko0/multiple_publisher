import { relations } from "drizzle-orm";
import { serial, text, timestamp, pgTable, uuid, varchar, integer } from "drizzle-orm/pg-core";
import { Role } from '@app/types';

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  providerId: uuid("provider_id").unique().notNull(),
  name: varchar("name", { length: 100 }).notNull().default("Anonymous"),
  birthDate: timestamp("birth_date").notNull().defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 50 }).$type<Role>().unique().notNull(),
});

export const userRoles = pgTable("user_roles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: 'cascade' }),
});

export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  userId: integer("user_id").references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
  workspaces: many(workspaces),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users),
  role: one(roles),
}));

export const workspacesRelations = relations(workspaces, ({ one }) => ({
  user: one(users),
}));
