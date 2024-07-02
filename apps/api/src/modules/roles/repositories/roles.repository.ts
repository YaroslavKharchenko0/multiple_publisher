import { Injectable } from "@nestjs/common";
import { Database, Orm, schema } from "../../../database";
import { eq } from "drizzle-orm";
import { Pagination, Role } from "@app/types";

export type InsertRole = typeof schema.roles.$inferInsert
export type SelectRole = typeof schema.roles.$inferSelect

@Injectable()
export class RoleRepository {
  constructor(@Orm() private readonly db: Database) { }

  private roles = schema.roles;

  async createOne(input: InsertRole) {
    return this.db.insert(this.roles).values(input).returning({ id: this.roles.id }).execute();
  }

  async findById(id: number) {
    const where = eq(this.roles.id, id);

    const result = await this.db.query.roles.findFirst({
      where
    })

    return result;
  }

  async findRoles(pagination: Pagination) {
    const result = await this.db.query.roles.findMany({
      offset: pagination.offset,
      limit: pagination.limit
    })

    return result;
  }

  async findByRole(role: Role) {
    const where = eq(this.roles.role, role);

    const result = await this.db.query.roles.findFirst({
      where
    })

    return result;
  }

  async updateById(id: number, input: Partial<InsertRole>) {
    const where = eq(this.roles.id, id);

    const result = await this.db.update(this.roles).set(input).where(where).returning({ id: this.roles.id }).execute();

    return result;
  }

  async deleteByRole(role: Role): Promise<void> {
    const where = eq(this.roles.role, role);

    const result = await this.db.delete(this.roles).where(where).execute();

    return result;
  }
}
