import { Injectable } from "@nestjs/common";
import { Database, Orm, schema } from "../../../database";
import { and, eq } from "drizzle-orm";
import { Pagination } from "@app/validation";

export type InsertFile = typeof schema.files.$inferInsert
export type SelectFile = typeof schema.files.$inferSelect

@Injectable()
export class FileRepository {
  constructor(@Orm() private readonly db: Database) { }

  private files = schema.files;

  async createOne(input: InsertFile) {
    return this.db.insert(this.files).values(input).returning().execute();
  }

  async findById(id: number) {
    const where = eq(this.files.id, id);

    const result = await this.db.query.files.findFirst({
      where
    })

    return result;
  }

  async findUserFiles(authorId: number, pagination: Pagination) {
    const where = eq(this.files.authorId, authorId);

    const result = await this.db.query.files.findMany({
      where,
      ...pagination
    })

    return result;
  }

  async findByProviderId(providerId: string) {
    const where = eq(this.files.providerId, providerId);

    const result = await this.db.query.files.findFirst({
      where
    })

    return result;
  }

  async updateById(id: number, input: Partial<InsertFile>) {
    const where = eq(this.files.id, id);

    const result = await this.db.update(this.files).set(input).where(where).returning().execute();

    return result;
  }

  async deleteById(id: number, userId?: number) {
    let where = eq(this.files.id, id);

    if (userId) {
      where = and(where, eq(this.files.authorId, userId));
    }

    const result = await this.db.delete(this.files).where(where).returning().execute();

    return result;
  }
}
