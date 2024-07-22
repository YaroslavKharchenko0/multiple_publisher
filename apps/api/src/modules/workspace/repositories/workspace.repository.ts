import { Injectable } from '@nestjs/common';
import { Database, Orm, schema } from '../../../database';
import { eq } from 'drizzle-orm';

export type InsertWorkspace = typeof schema.workspaces.$inferInsert;
export type SelectWorkspace = typeof schema.workspaces.$inferSelect;

export interface CreateWorkspaceParams {
  name: string;
  userId: number;
}

@Injectable()
export class WorkspaceRepository {
  constructor(@Orm() private readonly db: Database) { }

  private workspaces = schema.workspaces;

  async createOne(input: CreateWorkspaceParams) {
    return this.db.insert(this.workspaces).values(input).returning().execute();
  }

  async findById(id: number) {
    const where = eq(this.workspaces.id, id);

    const result = await this.db.query.workspaces.findFirst({
      where,
    });

    return result;
  }

  async deleteById(id: number): Promise<void> {
    const where = eq(this.workspaces.id, id);

    const result = await this.db.delete(this.workspaces).where(where).execute();

    return result;
  }

  async updateById(id: number, input: InsertWorkspace) {
    const where = eq(this.workspaces.id, id);

    const result = await this.db
      .update(this.workspaces)
      .set(input)
      .where(where)
      .returning({ id: this.workspaces.id })
      .execute();

    return result;
  }
}
