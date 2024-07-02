import { Injectable } from "@nestjs/common";
import { Database, Orm, schema } from "../../../database";
import { eq } from "drizzle-orm";

export type InsertUser = typeof schema.users.$inferInsert
export type SelectUser = typeof schema.users.$inferSelect

@Injectable()
export class UserRepository {
  constructor(@Orm() private readonly db: Database) { }

  private users = schema.users;

  async createOne(input: InsertUser) {
    return this.db.insert(this.users).values(input).returning({ id: this.users.id }).execute();
  }

  async findById(id: number) {
    const where = eq(this.users.id, id);

    const result = await this.db.query.users.findFirst({
      where
    })

    return result;
  }

  async findByEmail(email: string) {
    const where = eq(this.users.email, email);

    const result = await this.db.query.users.findFirst({
      where
    })

    return result;
  }

  async findByProviderId(providerId: string) {
    const where = eq(this.users.providerId, providerId);

    const result = await this.db.query.users.findFirst({
      where
    })

    return result;
  }

  async updateById(id: number, input: Partial<InsertUser>) {
    const where = eq(this.users.id, id);

    const result = await this.db.update(this.users).set(input).where(where).returning({ id: this.users.id, email: this.users.email }).execute();

    return result;
  }

  async deleteById(id: number) {
    const where = eq(this.users.id, id);

    const result = await this.db.delete(this.users).where(where).returning({ email: this.users.email }).execute();

    return result;
  }
}
