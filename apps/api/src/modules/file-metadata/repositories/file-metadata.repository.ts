import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';
import { Pagination } from '@app/validation';

export type InsertFileMetadata = typeof schema.fileMetadata.$inferInsert;
export type SelectFileMetadata = typeof schema.fileMetadata.$inferSelect;

@Injectable()
export class FileMetadataRepository {
  constructor(@Orm() private readonly db: Database) {}

  private fileMetadata = schema.fileMetadata;

  async createOne(input: InsertFileMetadata) {
    return this.db
      .insert(this.fileMetadata)
      .values(input)
      .returning()
      .execute();
  }

  async findByFile(id: number, pagination: Pagination) {
    const where = eq(this.fileMetadata.id, id);

    const result = await this.db.query.fileMetadata.findMany({
      where,
      ...pagination,
    });

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.fileMetadata.id, id);

    const result = await this.db
      .delete(this.fileMetadata)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
