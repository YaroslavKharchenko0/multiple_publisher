import { Injectable } from "@nestjs/common";
import { Database, Orm, schema } from "../../../database";
import { eq } from "drizzle-orm";

export type InsertUserRole = typeof schema.userRoles.$inferInsert
export type SelectUserRole = typeof schema.userRoles.$inferSelect

@Injectable()
export class UserRoleRepository {
  constructor(@Orm() private readonly db: Database) { }

  private userRoles = schema.userRoles;

  async createOne(input: InsertUserRole) {
    return this.db.insert(this.userRoles).values(input).returning({ id: this.userRoles.id }).execute();
  }

  async findById(id: number) {
    const where = eq(this.userRoles.id, id);

    const result = await this.db.query.userRoles.findFirst({
      where
    })

    return result;
  }

  findByUserId(userId: number) {
    const where = eq(this.userRoles.userId, userId);

    return this.db.query.userRoles.findFirst({
      where
    })
  }

  async deleteByUserId(userId: number): Promise<void> {
    const where = eq(this.userRoles.userId, userId);

    const result = await this.db.delete(this.userRoles).where(where).execute();

    return result;
  }

  async updateByUserId(userId: number, input: InsertUserRole) {
    const where = eq(this.userRoles.userId, userId);

    const result = await this.db.update(this.userRoles).set(input).where(where).returning({ id: this.userRoles.id }).execute();

    return result;
  }
}
