import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { and, eq } from 'drizzle-orm';
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
  publicationProviderId: number;
}

@Injectable()
export class PublicationRepository {
  constructor(@Orm() private readonly db: Database) { }

  private publications = schema.publications;

  async createOne(input: CreatePublicationInput) {
    return this.db
      .insert(this.publications)
      .values(input)
      .returning()
      .execute();
  }

  async findById(id: number) {
    const where = eq(this.publications.id, id);

    const result = await this.db.query.publications.findFirst({
      where,
    });

    return result;
  }

  async findByIdAndPostId(id: number, postId: number) {
    const where = and(
      eq(this.publications.id, id),
      eq(this.publications.postId, postId),
    );

    const result = await this.db.query.publications.findFirst({
      where,
    });

    return result;
  }

  async findPublicationsByPostId(postId: number, pagination: Pagination) {
    const where = eq(this.publications.postId, postId);

    const result = await this.db.query.publications.findMany({
      where,
      offset: pagination?.offset,
      limit: pagination?.limit,
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

  async updateByIdAndPostId(
    id: number,
    postId: number,
    input: Partial<CreatePublicationInput>,
  ) {
    const where = and(
      eq(this.publications.id, id),
      eq(this.publications.postId, postId),
    );

    const result = await this.db
      .update(this.publications)
      .set(input)
      .where(where)
      .returning()
      .execute();

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

  async deleteByIdAndPostId(id: number, postId: number) {
    const where = and(
      eq(this.publications.id, id),
      eq(this.publications.postId, postId),
    );

    const result = await this.db
      .delete(this.publications)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
