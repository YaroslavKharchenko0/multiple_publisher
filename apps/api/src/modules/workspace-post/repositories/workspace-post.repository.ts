import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { countDistinct, eq } from 'drizzle-orm';

export type InsertWorkspacePost = {
  workspaceId: number;
  postId: number;
};

export type SelectWorkspacePost = typeof schema.workspacePosts.$inferSelect;

export interface FindWorkspacePostsParams {
  workspaceId: number;
  pagination: {
    limit: number;
    offset: number;
  };
}

export interface FindWorkspacePostsCountParams {
  workspaceId: number;
}

@Injectable()
export class WorkspacePostRepository {
  constructor(@Orm() private readonly db: Database) { }

  private workspacePosts = schema.workspacePosts;

  async createOne(input: InsertWorkspacePost) {
    return this.db
      .insert(this.workspacePosts)
      .values(input)
      .returning()
      .execute();
  }

  async findMany(params: FindWorkspacePostsParams) {
    const where = eq(this.workspacePosts.workspaceId, params.workspaceId);

    const result = await this.db.query.workspacePosts.findMany({
      where,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
    });

    return result;
  }

  async findCount(params: FindWorkspacePostsCountParams) {
    const where = eq(this.workspacePosts.workspaceId, params.workspaceId);

    const query = this.db
      .select({ count: countDistinct(this.workspacePosts.workspaceId) })
      .from(this.workspacePosts)
      .where(where);

    const result = await query.execute();

    return result;
  }
}
