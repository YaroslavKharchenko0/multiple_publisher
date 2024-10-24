import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { countDistinct, eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';

export type InsertWorkspaceAccount = {
  workspaceId: number;
  accountId: number;
};

export type SelectWorkspaceAccount =
  typeof schema.workspaceAccounts.$inferSelect;

export interface FindWorkspaceAccountsParams {
  workspaceId: number;
  pagination: Pagination;
}

export interface FindWorkspaceAccountsCountParams {
  workspaceId: number;
}

@Injectable()
export class WorkspaceAccountRepository {
  constructor(@Orm() private readonly db: Database) { }

  private workspaceAccounts = schema.workspaceAccounts;

  async createOne(input: InsertWorkspaceAccount) {
    return this.db
      .insert(this.workspaceAccounts)
      .values(input)
      .returning()
      .execute();
  }

  async findMany(params: FindWorkspaceAccountsParams) {
    const where = eq(this.workspaceAccounts.workspaceId, params.workspaceId);

    const result = await this.db.query.workspaceAccounts.findMany({
      where,
      limit: params.pagination.limit,
      offset: params.pagination.offset,
    });

    return result;
  }

  async findCount(params: FindWorkspaceAccountsCountParams) {
    const where = eq(this.workspaceAccounts.workspaceId, params.workspaceId);

    const query = this.db
      .select({ count: countDistinct(this.workspaceAccounts.workspaceId) })
      .from(this.workspaceAccounts)
      .where(where);

    const result = await query.execute();

    return result;
  }
}
