import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';

export type InsertPostFile = typeof schema.postFiles.$inferInsert;
export type SelectPostFile = typeof schema.postFiles.$inferSelect;

@Injectable()
export class PostFileRepository {
  constructor(@Orm() private readonly db: Database) { }

  private postFiles = schema.postFiles;

  async createMany(input: InsertPostFile[]) {
    return this.db.insert(this.postFiles).values(input).returning().execute();
  }

  findByPostId(postId: number) {
    const where = eq(this.postFiles.postId, postId);

    return this.db.query.postFiles.findMany({
      where,
    });
  }

  deleteByPostId(postId: number) {
    const where = eq(this.postFiles.postId, postId);

    return this.db.delete(this.postFiles).where(where).returning().execute();
  }

  async findById(id: number) {
    const where = eq(this.postFiles.id, id);

    const result = await this.db.query.postFiles.findFirst({
      where,
    });

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.postFiles.id, id);

    const result = await this.db
      .delete(this.postFiles)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
