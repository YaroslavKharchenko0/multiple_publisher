import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Database, Orm } from "../../../database";
import { sql } from "drizzle-orm";

@Injectable()
export class HealthService {
  constructor(private readonly amqpConnection: AmqpConnection, @Orm() private readonly db: Database) { }

  private isAmqpConnected() {
    return this.amqpConnection.connected;
  }

  private async isDbConnected() {
    try {
      const query = sql`SELECT now()`;

      await this.db.execute(query)

      return true;
    }
    catch (error) {
      return false;
    }
  }

  private createStatus = (isConnected: boolean) => (isConnected ? 'ok' : 'error')

  async getHealth(traceId: string | undefined) {
    try {
      const amqp = this.createStatus(this.isAmqpConnected());

      const isDbConnected = await this.isDbConnected();

      if (!isDbConnected) throw new InternalServerErrorException('Database connection error');

      const db = this.createStatus(isDbConnected);

      return {
        status: 'ok',
        amqp,
        db,
        traceId,
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
