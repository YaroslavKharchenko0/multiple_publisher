import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { ExampleModule } from '../modules/example/example.module';
import { RmqErrorModule } from '@app/errors';
import { DatabaseModule } from '../database';
import { AuthModule } from '../modules/auth';
import { UserModule } from '../modules/user';


@Module({})
export class AppModule {
  static forRoot() {
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ExampleModule.forRoot(), RmqErrorModule, DatabaseModule.forRoot(), AuthModule.forRoot(), UserModule.forRoot()],
    };
  }
}
