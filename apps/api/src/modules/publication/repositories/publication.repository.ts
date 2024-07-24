import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';
import { PublicationStatus } from '@app/types';

export type InsertPublication = typeof schema.publications.$inferInsert;
export type SelectPublication = typeof schema.publications.$inferSelect;

export interface CreatePublicationInput {
  title: string;
  description: string;
  postId: number;
  status: PublicationStatus;
  accountId: number;
}

@Injectable()
export class PublicationRepository {
  constructor(@Orm() private readonly db: Database) { }

  private publications = schema.publications;

  async createOne(input: CreatePublicationInput) {
    return this.db
      .insert(this.publications)
      .values(input)
      .returning({ id: this.publications.id })
      .execute();
  }

  async findById(id: number) {
    const where = eq(this.publications.id, id);

    const result = await this.db.query.publications.findFirst({
      where,
    });

    return result;
  }

  async findPublicationsByPostId(postId: number) {
    const where = eq(this.publications.postId, postId);

    const result = await this.db.query.publications.findMany({
      where,
    });

    return result;
  }

  async findPublications(pagination: Pagination) {
    const result = await this.db.query.publications.findMany({
      offset: pagination.offset,
      limit: pagination.limit,
    });

    return result;
  }

  async updateById(id: number, input: Partial<CreatePublicationInput>) {
    const where = eq(this.publications.id, id);

    const result = await this.db
      .update(this.publications)
      .set(input)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.publications.id, id);

    const result = await this.db
      .delete(this.publications)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
