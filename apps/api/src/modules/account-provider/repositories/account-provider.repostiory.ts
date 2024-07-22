import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { ProviderKey } from '@app/types';
import { Pagination } from '@app/validation';

export type InsertAccountProvider = typeof schema.accountProviders.$inferInsert;
export type SelectAccountProvider = typeof schema.accountProviders.$inferSelect;

@Injectable()
export class AccountProviderRepository {
  constructor(@Orm() private readonly db: Database) {}

  private accountProviders = schema.accountProviders;

  async createOne(input: InsertAccountProvider) {
    return this.db
      .insert(this.accountProviders)
      .values(input)
      .returning()
      .execute();
  }

  async findByKey(key: ProviderKey) {
    const where = eq(this.accountProviders.key, key);

    const result = await this.db.query.accountProviders.findFirst({
      where,
    });

    return result;
  }

  async find(pagination: Pagination) {
    const result = await this.db.query.accountProviders.findMany({
      limit: pagination?.limit,
      offset: pagination?.offset,
    });

    return result;
  }

  async updateByKey(key: ProviderKey, input: Partial<InsertAccountProvider>) {
    const where = eq(this.accountProviders.key, key);

    const result = await this.db
      .update(this.accountProviders)
      .set(input)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteByKey(key: ProviderKey) {
    const where = eq(this.accountProviders.key, key);

    const result = await this.db
      .delete(this.accountProviders)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
