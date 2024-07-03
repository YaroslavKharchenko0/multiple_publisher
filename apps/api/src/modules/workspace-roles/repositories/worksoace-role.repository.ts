import { Injectable } from "@nestjs/common";
import { Database, Orm, schema } from "../../../database";
import { eq } from "drizzle-orm";
import { WorkspaceRole } from "@app/types";

export type InsertWorkspaceRole = typeof schema.workspaceRoles.$inferInsert
export type SelectWorkspaceRole = typeof schema.workspaceRoles.$inferSelect

@Injectable()
export class WorkspaceRoleRepository {
  constructor(@Orm() private readonly db: Database) { }

  private workspaceRoles = schema.workspaceRoles;

  async createOne(input: InsertWorkspaceRole) {
    return this.db.insert(this.workspaceRoles).values(input).returning().execute();
  }

  async findByRole(role: WorkspaceRole) {
    const where = eq(this.workspaceRoles.role, role);

    const result = await this.db.query.workspaceRoles.findFirst({
      where
    })

    return result;
  }

  async deleteByRole(role: WorkspaceRole) {
    const where = eq(this.workspaceRoles.role, role);

    const result = await this.db.delete(this.workspaceRoles).where(where).execute();

    return result;
  }
}
