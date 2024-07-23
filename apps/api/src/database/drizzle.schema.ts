import { relations } from 'drizzle-orm';
import {
  serial,
  text,
  timestamp,
  pgTable,
  uuid,
  varchar,
  integer,
} from 'drizzle-orm/pg-core';
import {
  AccountStatus,
  AccountTokenType,
  FileType,
  PostType,
  ProviderKey,
  Role,
  UploadStatus,
  WorkspaceRole,
} from '@app/types';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  providerId: uuid('provider_id').unique().notNull(),
  name: varchar('name', { length: 100 }).notNull().default('Anonymous'),
  birthDate: timestamp('birth_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  role: varchar('role', { length: 50 }).$type<Role>().unique().notNull(),
});

export const userRoles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  roleId: integer('role_id')
    .notNull()
    .references(() => roles.id, { onDelete: 'cascade' }),
});

export const workspaces = pgTable('workspaces', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const workspaceRoles = pgTable('workspace_roles', {
  id: serial('id').primaryKey(),
  role: varchar('role', { length: 50 })
    .$type<WorkspaceRole>()
    .unique()
    .notNull(),
});

export const workspaceUsers = pgTable('workspace_users', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  workspaceId: integer('workspace_id')
    .notNull()
    .references(() => workspaces.id, { onDelete: 'cascade' }),
  roleId: integer('role_id')
    .notNull()
    .references(() => workspaceRoles.id, { onDelete: 'cascade' }),
  joinedAt: timestamp('joined_at').defaultNow(),
});

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  providerId: uuid('provider_id').unique(),
  path: varchar('path', { length: 255 }),
  type: varchar('type', { length: 10 }).$type<FileType>().notNull(),
  uploadStatus: varchar('uploadStatus', { length: 50 }).$type<UploadStatus>(),
  authorId: integer('author_id')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const fileMetadata = pgTable('file_metadata', {
  id: serial('id').primaryKey(),
  fileId: integer('file_id')
    .notNull()
    .references(() => files.id, { onDelete: 'cascade' }),
  key: varchar('key', { length: 255 }).notNull(),
  value: text('value').notNull(),
});

export const accountProviders = pgTable('account_providers', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 50 }).$type<ProviderKey>().notNull().unique(),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  internalId: varchar('internal_id', { length: 100 }).unique().notNull(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  providerId: integer('provider_id')
    .notNull()
    .references(() => accountProviders.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  status: varchar('status', { length: 10 }).$type<AccountStatus>().notNull(),
});

export const accountTokens = pgTable('account_tokens', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id')
    .notNull()
    .references(() => accounts.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
  type: varchar('type', { length: 10 }).$type<AccountTokenType>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  type: varchar('type', { length: 10 }).$type<PostType>().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const postFiles = pgTable('post_files', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  fileId: integer('file_id')
    .notNull()
    .references(() => files.id, { onDelete: 'cascade' }),
});

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
  workspaces: many(workspaces),
  workspaceUsers: many(workspaceUsers),
  files: many(files),
  accounts: many(accounts),
  posts: many(posts),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users),
  role: one(roles),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  user: one(users, {
    fields: [workspaces.userId],
    references: [users.id],
  }),
  workspaceUsers: many(workspaceUsers),
}));

export const workspaceRolesRelations = relations(
  workspaceRoles,
  ({ many }) => ({
    workspaceUsers: many(workspaceUsers),
  }),
);

export const workspaceUsersRelations = relations(workspaceUsers, ({ one }) => ({
  user: one(users, {
    fields: [workspaceUsers.userId],
    references: [users.id],
  }),
  workspace: one(workspaces, {
    fields: [workspaceUsers.workspaceId],
    references: [workspaces.id],
  }),
  role: one(workspaceRoles, {
    fields: [workspaceUsers.roleId],
    references: [workspaceRoles.id],
  }),
}));

export const filesRelations = relations(files, ({ many, one }) => ({
  fileMetadata: many(fileMetadata),
  author: one(users, {
    fields: [files.authorId],
    references: [users.id],
  }),
  postFiles: many(postFiles),
}));

export const fileMetadataRelations = relations(fileMetadata, ({ one }) => ({
  file: one(files, {
    fields: [fileMetadata.fileId],
    references: [files.id],
  }),
}));

export const accountProvidersRelations = relations(
  accountProviders,
  ({ many }) => ({
    accounts: many(accounts),
  }),
);

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
  provider: one(accountProviders, {
    fields: [accounts.providerId],
    references: [accountProviders.id],
  }),
  accountTokens: many(accountTokens),
}));

export const accountTokensRelations = relations(accountTokens, ({ one }) => ({
  account: one(accounts, {
    fields: [accountTokens.accountId],
    references: [accounts.id],
  }),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  postFiles: many(postFiles),
}));
