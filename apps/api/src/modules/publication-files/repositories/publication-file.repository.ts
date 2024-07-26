import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';

export type InsertPublicationFile = typeof schema.publicationFiles.$inferInsert;
export type SelectPublicationFile = typeof schema.publicationFiles.$inferSelect;

@Injectable()
export class PublicationFileRepository {
  constructor(@Orm() private readonly db: Database) { }

  private publicationFiles = schema.publicationFiles;

  async createMany(input: InsertPublicationFile[]) {
    return this.db
      .insert(this.publicationFiles)
      .values(input)
      .returning()
      .execute();
  }

  findByPublicationId(publicationId: number) {
    const where = eq(this.publicationFiles.publicationId, publicationId);

    return this.db.query.publicationFiles.findMany({
      where,
    });
  }

  deleteByPublicationId(publicationId: number) {
    const where = eq(this.publicationFiles.publicationId, publicationId);

    return this.db
      .delete(this.publicationFiles)
      .where(where)
      .returning()
      .execute();
  }

  async findById(id: number) {
    const where = eq(this.publicationFiles.id, id);

    const result = await this.db.query.publicationFiles.findFirst({
      where,
    });

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.publicationFiles.id, id);

    const result = await this.db
      .delete(this.publicationFiles)
      .where(where)
      .returning()
      .execute();

    return result;
  }
}
