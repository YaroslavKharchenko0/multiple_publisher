import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { count, eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';

export type InsertPost = typeof schema.posts.$inferInsert;
export type SelectPost = typeof schema.posts.$inferSelect;

@Injectable()
export class PostRepository {
  constructor(@Orm() private readonly db: Database) { }

  private posts = schema.posts;

  async createOne(input: InsertPost) {
    return this.db
      .insert(this.posts)
      .values(input)
      .returning({ id: this.posts.id })
      .execute();
  }

  async findById(id: number) {
    const where = eq(this.posts.id, id);

    const result = await this.db.query.posts.findFirst({
      where,
    });

    return result;
  }

  async findPosts(pagination: Pagination) {
    const result = await this.db.query.posts.findMany({
      offset: pagination.offset,
      limit: pagination.limit,
    });

    return result;
  }

  async findPostsCount() {
    const result = await this.db
      .select({ count: count() })
      .from(this.posts)
      .execute();

    return result;
  }

  async findPostsByUserId(userId: number, pagination: Pagination) {
    const where = eq(this.posts.userId, userId);

    const result = await this.db.query.posts.findMany({
      where,
      offset: pagination.offset,
      limit: pagination.limit,
    });

    return result;
  }

  async findPostsCountByUserId(userId: number) {
    const where = eq(this.posts.userId, userId);

    const result = await this.db
      .select({ count: count() })
      .from(this.posts)
      .where(where)
      .execute();

    return result;
  }

  async updateById(id: number, input: Partial<InsertPost>) {
    const where = eq(this.posts.id, id);

    const result = await this.db
      .update(this.posts)
      .set(input)
      .where(where)
      .returning()
      .execute();

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.posts.id, id);

    const result = await this.db
      .delete(this.posts)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
