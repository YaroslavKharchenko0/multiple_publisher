import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { and, count, countDistinct, eq, max } from 'drizzle-orm';

export type InsertWorkspaceUser = typeof schema.workspaceUsers.$inferInsert;
export type SelectWorkspaceUser = typeof schema.workspaceUsers.$inferSelect;

export interface FindOneParams {
  workspaceId: number;
  userId: number;
}

export interface UpdateOneParams {
  workspaceId: number;
  userId: number;
}

export interface DeleteOneParams {
  workspaceId: number;
  userId: number;
}

export interface FindWorkspaceUsersParams {
  workspaceId: number;
  pagination: {
    limit: number;
    offset: number;
  };
}

export interface FindUserWorkspacesParams {
  userId: number;
  pagination: {
    limit: number;
    offset: number;
  };
}

export interface FindUserWorkspaceCountParams {
  userId: number;
}

@Injectable()
export class WorkspaceUserRepository {
  constructor(@Orm() private readonly db: Database) { }

  private workspaceUsers = schema.workspaceUsers;

  async createOne(input: InsertWorkspaceUser) {
    return this.db
      .insert(this.workspaceUsers)
      .values(input)
      .returning()
      .execute();
  }

  async findOne(params: FindOneParams) {
    const where = and(
      eq(this.workspaceUsers.userId, params.userId),
      eq(this.workspaceUsers.workspaceId, params.workspaceId),
    );

    const result = await this.db.query.workspaceUsers.findFirst({
      where,
    });

    return result;
  }

  async updateOne(
    params: UpdateOneParams,
    input: Partial<InsertWorkspaceUser>,
  ) {
    const where = and(
      eq(this.workspaceUsers.userId, params.userId),
      eq(this.workspaceUsers.workspaceId, params.workspaceId),
    );

    const result = await this.db
      .update(this.workspaceUsers)
      .set(input)
      .where(where)
      .returning({ id: this.workspaceUsers.id })
      .execute();

    return result;
  }

  async deleteOne(params: DeleteOneParams) {
    const where = and(
      eq(this.workspaceUsers.userId, params.userId),
      eq(this.workspaceUsers.workspaceId, params.workspaceId),
    );

    const result = await this.db
      .delete(this.workspaceUsers)
      .where(where)
      .returning({ id: this.workspaceUsers.id })
      .execute();

    return result;
  }

  async findWorkspaceUsers(params: FindWorkspaceUsersParams) {
    const where = eq(this.workspaceUsers.workspaceId, params.workspaceId);

    const result = await this.db.query.workspaceUsers.findMany({
      where,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
    });

    return result;
  }

  async findUserWorkspaces(params: FindUserWorkspacesParams) {
    const where = eq(this.workspaceUsers.userId, params.userId);

    const result = await this.db
      .select({
        id: this.workspaceUsers.id,
        joinedAt: max(this.workspaceUsers.joinedAt),
        workspaceId: this.workspaceUsers.workspaceId,
        userId: this.workspaceUsers.userId,
        roleId: this.workspaceUsers.roleId,
      })
      .from(this.workspaceUsers)
      .where(where)
      .groupBy(
        this.workspaceUsers.workspaceId,
        this.workspaceUsers.joinedAt,
        this.workspaceUsers.id,
      )
      .orderBy(this.workspaceUsers.joinedAt)
      .limit(params.pagination.limit)
      .offset(params.pagination.offset)
      .execute();

    return result;
  }

  async findUserWorkspaceCount(params: FindUserWorkspaceCountParams) {
    const where = eq(this.workspaceUsers.userId, params.userId);

    const query = this.db
      .select({ count: countDistinct(this.workspaceUsers.workspaceId) })
      .from(this.workspaceUsers)
      .where(where);

    const result = await query.execute();

    return result;
  }
}
