import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';

export type InsertAccount = typeof schema.accounts.$inferInsert;
export type SelectAccount = typeof schema.accounts.$inferSelect;

@Injectable()
export class AccountRepository {
  constructor(@Orm() private readonly db: Database) { }

  private accounts = schema.accounts;

  async createOne(input: InsertAccount) {
    return this.db
      .insert(this.accounts)
      .values(input)
      .returning()
      .execute();
  }

  async findById(id: number) {
    const where = eq(this.accounts.id, id);

    const result = await this.db.query.accounts.findFirst({
      where,
    });

    return result;
  }

  async find(pagination: Pagination) {
    const result = await this.db.query.accounts.findMany({
      limit: pagination?.limit,
      offset: pagination?.offset,
    });

    return result;
  }

  async updateByKey(id: number, input: Partial<InsertAccount>) {
    const where = eq(this.accounts.id, id);

    const result = await this.db
      .update(this.accounts)
      .set(input)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteByKey(id: number) {
    const where = eq(this.accounts.id, id);

    const result = await this.db
      .delete(this.accounts)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
