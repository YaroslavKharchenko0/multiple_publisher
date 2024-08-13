import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { PublicationProvider } from '@app/types';
import { Pagination } from '@app/validation';

export type InsertPublicationProvider =
  typeof schema.publicationProviders.$inferInsert;
export type SelectPublicationProvider =
  typeof schema.publicationProviders.$inferSelect;

@Injectable()
export class PublicationProviderRepository {
  constructor(@Orm() private readonly db: Database) { }

  private publicationProviders = schema.publicationProviders;

  async createOne(input: InsertPublicationProvider) {
    return this.db
      .insert(this.publicationProviders)
      .values(input)
      .returning()
      .execute();
  }

  async findByKey(key: PublicationProvider) {
    const where = eq(this.publicationProviders.key, key);

    const result = await this.db.query.publicationProviders.findFirst({
      where,
    });

    return result;
  }

  async findById(id: number) {
    const where = eq(this.publicationProviders.id, id);

    const result = await this.db.query.publicationProviders.findFirst({
      where,
    });

    return result;
  }

  async find(pagination: Pagination) {
    const result = await this.db.query.publicationProviders.findMany({
      limit: pagination?.limit,
      offset: pagination?.offset,
    });

    return result;
  }

  async updateByKey(
    key: PublicationProvider,
    input: Partial<InsertPublicationProvider>,
  ) {
    const where = eq(this.publicationProviders.key, key);

    const result = await this.db
      .update(this.publicationProviders)
      .set(input)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteByKey(key: PublicationProvider) {
    const where = eq(this.publicationProviders.key, key);

    const result = await this.db
      .delete(this.publicationProviders)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async findByAccountProviderId(accountProviderId: number) {
    const where = eq(
      this.publicationProviders.accountProviderId,
      accountProviderId,
    );

    const result = await this.db.query.publicationProviders.findMany({
      where,
    });

    return result;
  }
}
