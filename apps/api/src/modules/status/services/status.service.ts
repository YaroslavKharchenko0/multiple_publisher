import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Database, Orm } from '../../../database';
import { sql } from 'drizzle-orm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StatusService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Orm() private readonly db: Database,
    private readonly configService: ConfigService,
  ) {}

  private isAmqpConnected() {
    return this.amqpConnection.connected;
  }

  private async isDbConnected() {
    try {
      const query = sql`SELECT now()`;

      await this.db.execute(query);

      return true;
    } catch (error) {
      return false;
    }
  }

  private createStatus = (isConnected: boolean) =>
    isConnected ? 'ok' : 'error';

  async getHealth(traceId: string | undefined) {
    try {
      const amqp = this.createStatus(this.isAmqpConnected());

      const isDbConnected = await this.isDbConnected();

      if (!isDbConnected)
        throw new InternalServerErrorException('Database connection error');

      const db = this.createStatus(isDbConnected);

      return {
        status: this.createStatus(true),
        amqp,
        db,
        traceId,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getStatus() {
    const version = this.configService.getOrThrow<string>('VERSION');

    return {
      status: this.createStatus(true),
      version,
    };
  }
}
