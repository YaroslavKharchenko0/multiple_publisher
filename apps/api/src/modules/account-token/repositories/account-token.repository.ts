import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';

export type InsertAccountToken = typeof schema.accountTokens.$inferInsert;
export type SelectAccountToken = typeof schema.accountTokens.$inferSelect;

@Injectable()
export class AccountTokenRepository {
  constructor(@Orm() private readonly db: Database) { }

  private accountTokens = schema.accountTokens;

  async createOne(input: InsertAccountToken) {
    return this.db
      .insert(this.accountTokens)
      .values(input)
      .returning()
      .execute();
  }

  async findByAccountId(accountId: number) {
    const where = eq(this.accountTokens.accountId, accountId);

    const result = await this.db.query.accountTokens.findFirst({
      where,
    });

    return result;
  }

  async find(pagination: Pagination) {
    const result = await this.db.query.accountTokens.findMany({
      limit: pagination?.limit,
      offset: pagination?.offset,
    });

    return result;
  }

  async updateByAccountId(accountId: number, input: Partial<InsertAccountToken>) {
    const where = eq(this.accountTokens.accountId, accountId);

    const set = {
      ...input,
      updatedAt: new Date(),
    }

    const result = await this.db
      .update(this.accountTokens)
      .set(set)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteByAccountId(accountId: number) {
    const where = eq(this.accountTokens.accountId, accountId);

    const result = await this.db
      .delete(this.accountTokens)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
