import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';
import { AccountStatus } from '@app/types';

export type InsertAccount = typeof schema.accounts.$inferInsert;
export type SelectAccount = typeof schema.accounts.$inferSelect;

export interface InsertAccountParams {
  name: string;
  providerId: number;
  status: AccountStatus;
  userId: number;
}

@Injectable()
export class AccountRepository {
  constructor(@Orm() private readonly db: Database) { }

  private accounts = schema.accounts;

  async createOne(input: InsertAccountParams) {
    return this.db.insert(this.accounts).values(input).returning().execute();
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

  async updateById(id: number, input: Partial<InsertAccount>) {
    const where = eq(this.accounts.id, id);

    const set = {
      ...input,
      updatedAt: new Date(),
    };

    const result = await this.db
      .update(this.accounts)
      .set(set)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.accounts.id, id);

    const result = await this.db
      .delete(this.accounts)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async findAccountByInternalId(internalId: string) {
    const where = eq(this.accounts.internalId, internalId);

    const result = await this.db.query.accounts.findFirst({
      where,
    });

    return result;
  }
}
