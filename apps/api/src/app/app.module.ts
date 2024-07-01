import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { ExampleModule } from '../modules/example/example.module';
import { RmqErrorModule } from '@app/errors';
import { DatabaseModule } from '../database';
import { AWSModule } from '@app/aws';


@Module({})
export class AppModule {
  static forRoot() {
    return {
      module: AppModule,
      imports: [ConfigModule.forRoot(), ExampleModule.forRoot(), RmqErrorModule, DatabaseModule.forRoot(), AWSModule.forRoot()],
      controllers: [],
    };
  }
}
